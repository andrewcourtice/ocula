<template>
    <settings-layout class="route settings-about" title="About" :back-route="backRoute">
        <div class="padding__horizontal--large">
            <div class="text--centre">
                <img class="settings-about__logo" :src="logo" alt="Ocula">
                <h1>{{ manifest.title }}</h1>
                <div>{{ manifest.description }}</div>
            </div>
            <div class="settings-about__details-grid margin__top--large">
                <strong>Version</strong>
                <div>{{ manifest.version }}</div>
                <strong>Author</strong>
                <div>{{ manifest.author }}</div>
                <strong>Licence</strong>
                <div>{{ manifest.license }}</div>
                <strong>Source</strong>
                <a :href="repository" target="_blank">Github</a>
            </div>
            <div class="settings-about__details-grid margin__top--large">
                <strong>Forecast Data</strong>
                <a href="https://openweathermap.org" target="_blank">Open Weather Maps</a>
                <strong>Maps/Geocoding</strong>
                <a href="https://www.mapbox.com" target="_blank">Mapbox</a>
                <strong>Map Tiles</strong>
                <a href="https://www.rainviewer.com" target="_blank">RainViewer</a>
                <strong>Logo Design</strong>
                <a href="https://github.com/ethanroxburgh" target="_blank">Ethan Roxburgh</a>
                <strong>Icons</strong>
                <a href="https://feathericons.com/" target="_blank">Feather Icons</a>
            </div>
            <div class="margin__top--large text--centre">
                <small class="text--meta">Psalm 147:8</small>
            </div>
        </div>
    </settings-layout>   
</template>

<script lang="ts">
import ROUTES from '../../constants/core/routes';

import SettingsLayout from '../../components/layouts/settings.vue';

import manifest from '../../../package.json';
import logo from '../../assets/images/logo/logo-192.svg';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        SettingsLayout
    },

    setup() {
        const backRoute = {
            name: ROUTES.settings.index
        };

        return {
            backRoute,
            logo,
            manifest
        };
    }

});
</script>

<style lang="scss">

    .settings-about__logo {
        width: 96px;
    }

    .settings-about__details-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: var(--spacing__x-small) var(--spacing__small);
    }

</style>