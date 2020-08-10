<template>
    <app-layout class="weather-route">
        <template #header>
            <div layout="row center-left" v-if="location" @click="updateLocation">
                <icon name="map-pin"/><strong class="margin__left--small">{{ isLoading ? 'Updating...' : location.shortName }}</strong>
            </div>
        </template>
        <div v-if="!settingsLocation">
            <div class="text--centre">
                <h2>No Location</h2>
                <p>No location set. Tap here to set a location.</p>
                <button class="button button--primary" @click="updateLocation">Set Location</button>
            </div>
        </div>
        <router-view #default="{ Component }" v-else>
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
        <location-modal />
    </app-layout>
</template>

<script lang="ts">
import LOCATIONS from '../../constants/locations';



import AppLayout from '../../components/core/layouts/app.vue';
import LocationModal from '../../components/core/modals/location.vue';

import settingsController from '../../controllers/settings';
import weatherController from '../../controllers/weather';

export default {

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
    
};
</script>