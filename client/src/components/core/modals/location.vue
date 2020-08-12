<template>
    <modal :id="id" class="location-modal" @open="reset">
        <search-box class="location-modal__search" placeholder="Search for a location..." :loading="loading" v-model="search" v-focus />
        <div class="menu margin__top--small">
            <div class="menu-item" layout="row center-left" @click="setCurrentLocation">
                <icon name="navigation" class="margin__right--small"/>
                <div class="text--truncate" self="size-x1">Current Location</div>
            </div>
            <template v-if="query">
                <div class="menu-item" layout="row center-left" v-for="location in locations" :key="location.id" @click="setLocation(location, true)">
                    <icon name="map" class="margin__right--small"/>
                    <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
                </div>
            </template>
            <template v-else>
                <div class="menu-item" layout="row center-justify" v-for="location in savedLocations" :key="location.id" @click="setLocation(location)">
                    <icon name="star" class="margin__right--small"/>
                    <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
                    <div @click.stop="removeLocation(location)">
                        <icon name="trash-2" class="margin__left--small"/>
                    </div>
                </div>
            </template>
        </div>
    </modal>
</template>

<script lang="ts">
import MODALS from '../../../constants/modals';

import {
    defineComponent,
    ref,
    computed
} from 'vue';

import {
    state,
    searchLocations
} from '../../../store';

import {
    functionDebounce
} from '@ocula/utilities';

import type {
    ILocation
} from '../../../interfaces/location';

export default defineComponent({

    setup() {
        const id = MODALS.locations;

        const query = ref('');
        const locations = ref<ILocation[]>([]);
        const loading = ref(false);

        const savedLocations = state.settings.locations;

        const executeSearch = functionDebounce(async function(query) {
            loading.value = true;

            try {
                locations.value = await searchLocations(query);
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

        function setCurrentLocation() {

        }

        function setLocation(location: ILocation) {
            alert(JSON.stringify(location));
        }

        function removeLocation() {

        }

        function reset() {
            query.value = '';
            locations.value = [];
        }

        return {
            id,
            query,
            locations,
            loading,
            search,
            savedLocations,
            setCurrentLocation,
            setLocation,
            removeLocation
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