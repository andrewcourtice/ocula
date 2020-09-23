<template>
    <modal :id="id" class="location-modal" ref="modal" @open="reset">
        <search-box class="location-modal__search" placeholder="Search for a location..." :loading="loading" v-model="search" v-focus />
        <div class="menu margin__top--small">
            <div class="menu-item" layout="row center-left" @click="setCurrentLocation">
                <icon name="gps-line" class="margin__right--small"/>
                <div class="text--truncate" self="size-x1">Current Location</div>
            </div>
            <template v-if="query">
                <div class="menu-item" layout="row center-left" v-for="location in searchResults" :key="location.id" @click="addLocation(location, true)">
                    <icon name="map-pin-line" class="margin__right--small"/>
                    <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
                </div>
            </template>
            <template v-else>
                <div class="menu-item" layout="row center-justify" v-for="location in locations" :key="location.id" @click="setLocation(location)">
                    <icon name="star-line" class="margin__right--small"/>
                    <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
                    <div v-tooltip:left="'Remove Location'" @click.stop="removeLocation(location)">
                        <icon name="delete-bin-line" class="margin__left--small"/>
                    </div>
                </div>
            </template>
        </div>
    </modal>
</template>

<script lang="ts">
import MODALS from '../../constants/core/modals';

import {
    defineComponent,
    ref,
    computed
} from 'vue';

import {
    state,
    searchLocations,
    setLocation,
    setCurrentLocation,
    addLocation,
    removeLocation
} from '../../store';

import {
    functionDebounce
} from '@ocula/utilities';

import type {
    ILocation
} from '../../interfaces/location';

export default defineComponent({

    setup() {
        const id = MODALS.locations;

        const modal = ref(null);

        const query = ref('');
        const searchResults = ref<ILocation[]>([]);
        const loading = ref(false);

        const locations = computed(() => state.settings.locations);

        const executeSearch = functionDebounce(async function(query) {
            loading.value = true;

            try {
                searchResults.value = await searchLocations(query);
            } finally {
                loading.value = false;
            }
        }, 500);

        const search = computed({
            get: () => query.value,
            set: value => {
                query.value = value;

                if (value && value.length > 0) {
                    executeSearch(value);
                }
            }
        });

        function closeInvoke(callback) {
            return (...args) => {
                try {
                    callback(...args);
                } finally {
                    modal.value.close();
                }
            };
        }

        function reset() {
            query.value = '';
            searchResults.value = [];
        }

        return {
            id,
            modal,
            query,
            loading,
            search,
            reset,
            locations,
            searchResults,
            removeLocation,
            addLocation: closeInvoke(addLocation),
            setLocation: closeInvoke(setLocation),
            setCurrentLocation: closeInvoke(setCurrentLocation)
        };
    }

});
</script>

<style lang="scss">

    .location-modal {

        & .modal__body {
            padding: var(--spacing__small);
        }
    }

    .location-modal__search {
        width: 100%;
        border: none;
    }

</style>