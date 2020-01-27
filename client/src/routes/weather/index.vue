<template>
    <app-layout class="weather-layout">
        <template #header>
            <div layout="row center-left" v-if="location" @click="updateLocation">
                <icon name="map-pin"/><span class="margin__left--x-small">{{ isLoading ? 'Updating...' : location.shortName }}</span>
            </div>
        </template>
        <div v-if="!settingsLocation">
            <div class="text--centre">
                <h2>No Location</h2>
                <p>No location set. Tap here to set a location.</p>
                <button class="button button--primary" @click="updateLocation">Set Location</button>
            </div>
        </div>
        <keep-alive v-else>
            <router-view></router-view>
        </keep-alive>
        <location-modal />
    </app-layout>
</template>

<script lang="ts">
import LOCATIONS from '../../constants/locations';

import Vue from 'vue';

import AppLayout from '../../components/core/layouts/app.vue';
import LocationModal from '../../components/core/modals/location.vue';

import settingsController from '../../controllers/settings';
import weatherController from '../../controllers/weather';

export default Vue.extend({

    computed: {

        isLoading() {
            return weatherController.isLoading;
        },

        location() {
            return weatherController.location;
        },

        settingsLocation() {
            return settingsController.location;
        }

    },

    methods: {

        updateLocation() {
            settingsController.updateLocation();
        }

    },

    components: {
        AppLayout,
        LocationModal
    }
    
});
</script>

<style lang="scss">

    .weather-layout {
        padding: var(--spacing__large);
    }

</style>