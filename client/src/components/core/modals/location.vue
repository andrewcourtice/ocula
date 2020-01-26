<template>
    <modal class="location-modal" ref="modal">
        <search-box class="location-modal__search" placeholder="Search for a location..." v-model="search" v-focus />
        <div class="menu margin__top--medium">
            <div class="menu-item" layout="row center-left" @click="setCurrentLocation">
                <icon name="navigation" class="margin__right--small"/>
                <div class="text--truncate" self="size-x1">Current Location</div>
            </div>
            <div class="menu-item" layout="row center-left" v-for="location in locations" :key="location.id" @click="setLocation(location)">
                <icon name="map" class="margin__right--small"/>
                <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
            </div>
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
            locations: []
        };
    },

    computed: {

        search: {
            get() {
                return this.query;
            },
            set(value: string) {
                this.query = value;

                if (value && value.length > 2) {
                    this.searchLocations(value);
                }
            }
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

        setLocation(location) {
            settingsController.location = location;
            this.close();
        },

        searchLocations: functionDebounce(async function(query) {
            this.locations = await settingsController.searchLocations(query);
        }, 500, {
            leading: true,
            trailing: true
        })

    }

});
</script>

<style lang="scss">

    .location-modal__search {
        width: 100%;
    }

</style>