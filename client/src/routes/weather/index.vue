<template>
    <app-layout class="weather-layout">
        <template #header>
            <div layout="row center-justify">
                <div class="text--centre" self="size-x1">
                    <strong v-if="location">{{ location.shortName }}</strong>
                </div>
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
        <keep-alive v-else>
            <router-view></router-view>
        </keep-alive>
        <alerts-sidebar></alerts-sidebar>
    </app-layout>
</template>

<script lang="ts">
import LOCATIONS from '../../constants/locations';

import Vue from 'vue';

import AppLayout from '../../components/core/layouts/app.vue';
import AlertsSidebar from '../../components/weather/sidebars/alerts.vue';

import settingsController from '../../controllers/settings';
import weatherController from '../../controllers/weather';

export default Vue.extend({

    computed: {

        locationId() {
            return settingsController.location;
        },

        location() {
            return weatherController.location;
        }

    },

    methods: {

        openAlerts() {
            weatherController.openAlertsSidebar();
        },

        setCurrentLocation() {
            settingsController.location = LOCATIONS.current;
        }

    },

    components: {
        AppLayout,
        AlertsSidebar
    }
    
});
</script>