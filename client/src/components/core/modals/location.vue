<template>
    <modal class="location-modal" ref="modal">
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
import EVENTS from '../../../constants/events';

import Vue from 'vue';

import subscriberMixin from '../../core/mixins/subscriber';

import settingsController from '../../../controllers/settings';

import {
    functionDebounce
} from '@ocula/utilities';

export default Vue.extend({

    mixins: [
        subscriberMixin(EVENTS.modals.location)
    ],
    
    data() {
        return {
            query: '',
            locations: [],
            loading: false
        };
    },

    computed: {

        search: {
            get() {
                return this.query;
            },
            set(value: string) {
                this.query = value;

                if (value && value.length > 0) {
                    this.searchLocations(value);
                }
            }
        },

        savedLocations() {
            return settingsController.locations;
        }

    },

    methods: {

        open(resolve, reject) {
            this.query = '';
            this.locations = [];

            this.$refs.modal.open();
        },

        close() {
            this.$refs.modal.close();
        },

        setCurrentLocation() {
            settingsController.setCurrentLocation();
            this.close();
        },

        setLocation(location, addLocation: boolean) {
            settingsController.location = location;

            if (addLocation) {
                settingsController.addLocation(location);
            }

            this.close();
        },

        removeLocation(location) {
            settingsController.removeLocation(location);
        },

        searchLocations: functionDebounce(async function(query) {
            this.loading = true;

            try {
                this.locations = await settingsController.searchLocations(query);
            } finally {
                this.loading = false;
            }
        }, 500)

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