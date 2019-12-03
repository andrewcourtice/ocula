<template>
    <app-layout class="weather-layout">
        <template #header>
            <div layout="row center-justify">
                <span style="margin-left: 1rem;">{{ location }}</span>
                <i class="fas fa-bell" @click="openAlerts"></i>
            </div>
        </template>
        <router-view v-if="!loading"></router-view>
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

        location() {
            return locationController.name;
        }

    },

    methods: {

        openAlerts() {
            weatherController.openAlertsSidebar();
        }

    },

    async mounted() {
        const location = settingsController.location;

        if (!location) {
            settingsController.location = LOCATIONS.current;
        }

        this.loading = true;

        try {
            await locationController.load(settingsController.location);
        } finally {
            this.loading = false;
        }
    },

    components: {
        AppLayout,
        AlertsSidebar
    }
    
});
</script>