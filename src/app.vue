<template>
    <div class="app">
        <div class="app__top-bar" layout="row center-justify">
            <div>
                <i class="fas fa-map-marker-alt"></i>&nbsp;{{ location }}
            </div>
            <i class="fas fa-sliders-h" @click="openSettings"></i>
        </div>
        <router-view v-if="!loading"></router-view>
        <settings-sidebar></settings-sidebar>
    </div>
</template>

<script lang="ts">
import LOCATIONS from './constants/locations';

import Vue from 'vue';

import SettingsSidebar from './components/sidebars/settings.vue';

import settingsController from './controllers/settings';
import locationController from './controllers/location';

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

        openSettings() {
            settingsController.openSettingsSidebar();
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
        SettingsSidebar
    }
    
});
</script>

<style lang="scss">

    .app {
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        padding: 2rem;
    }

    .app__top-bar {
        margin-bottom: 2rem;
    }

</style>