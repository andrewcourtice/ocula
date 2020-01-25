<template>
    <modal class="location-modal" ref="modal">
        <input type="text" v-model="search" v-focus>
        <div class="menu">
            <div class="menu-item" @click="setCurrentLocation"><icon name="navigation" class="margin__right--x-small"/> Current Location</div>
            <div class="menu-item text--truncate" v-for="location in locations" :key="location.id" @click="setLocation(location)">{{ location.longName }}</div>
        </div>
    </modal>
</template>

<script lang="ts">
import EVENTS from '../../../constants/events';

import Vue from 'vue';

import subscriberMixin from '../../core/mixins/subscriber';

import settingsController from '../../../controllers/settings';

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

        async searchLocations(query) {
            this.locations = await settingsController.searchLocations(query);
            this.$forceUpdate();
        }

    }

});
</script>