<template>
    <app-layout class="weather-layout">
        <template #header>
            <div layout="row center-justify">
                <div class="text--centre" self="size-x1">{{ location }}</div>
                <icon name="bell" @click.native="openAlerts"></icon>
            </div>
        </template>
        <div v-if="!locationId">
            <div class="text--centre">
                <h2>No Location</h2>
                <p>No location set. Type in the box above to set a location or tap the button below to use your current position</p>
                <button @click="setCurrentLocation">Use my location</button>
            </div>
        </div>
        <template v-else>
            <div class="text--centre" v-if="loading">Loading...</div>
            <template v-else>
                <keep-alive v-if="location">
                    <router-view></router-view>
                </keep-alive>
                <div v-else>
                    <h2>Unknown Location</h2>
                    <p>We had trouble loading your location</p>
                    <button @click="load">Try again</button>
                </div>
            </template>
        </template>
        <alerts-sidebar></alerts-sidebar>
    </app-layout>
</template>

<script lang="ts">
import LOCATIONS from '../../constants/locations';

import Vue from 'vue';

import AppLayout from '../../components/layouts/app.vue';
import AlertsSidebar from '../../components/sidebars/alerts.vue';

import settingsController from '../../controllers/settings';
import locationController from '../../controllers/location';
import weatherController from '../../controllers/weather';

export default Vue.extend({

    data() {
        return {
            loading: true
        };
    },

    computed: {

        locationId() {
            return settingsController.location;
        },

        location() {
            return locationController.name;
        }

    },

    methods: {

        openAlerts() {
            weatherController.openAlertsSidebar();
        },

        setCurrentLocation() {
            settingsController.location = LOCATIONS.current;

            this.load();
        },

        async load() {
            if (!this.locationId) {
                return;
            }

            this.loading = true;

            try {
                await locationController.load(settingsController.location);
            } finally {
                this.loading = false;
            }
        }

    },

    mounted() {
        this.load();
    },

    components: {
        AppLayout,
        AlertsSidebar
    }
    
});
</script>