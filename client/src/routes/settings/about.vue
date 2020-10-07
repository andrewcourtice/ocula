<template>
    <settings-layout class="route settings-about" title="About" :back-route="backRoute">
        <div class="settings-about__body">
            <div class="settings-about__header">
                <img class="settings-about__logo" :src="logo" alt="Ocula">
                <h1 class="settings-about__title">{{ manifest.title }}</h1>
                <div class="settings-about__subtitle">{{ manifest.description }}</div>
            </div>
            <block class="settings-about__block" title="Details">
                <div class="settings-about__details-grid">
                    <strong>Version</strong>
                    <div>{{ manifest.version }}</div>
                    <strong>Author</strong>
                    <div>{{ manifest.author }}</div>
                    <strong>Licence</strong>
                    <div>{{ manifest.license }}</div>
                    <strong>Source</strong>
                    <a :href="manifest.repository" target="_blank">Github</a>
                </div>
            </block>
            <block class="settings-about__block" title="Attribution">
                <div class="settings-about__details-grid">
                    <strong>Forecast Data</strong>
                    <a href="https://openweathermap.org" target="_blank">Open Weather Maps</a>
                    <strong>Tide Data</strong>
                    <a href="https://www.worldtides.info" target="_blank">World Tides</a>
                    <strong>Maps/Geocoding</strong>
                    <a href="https://www.mapbox.com" target="_blank">Mapbox</a>
                    <strong>Radar Imagery</strong>
                    <a href="https://www.rainviewer.com" target="_blank">RainViewer</a>
                    <strong>Logo Design</strong>
                    <a href="https://github.com/ethanroxburgh" target="_blank">Ethan Roxburgh</a>
                    <strong>Icons</strong>
                    <a href="https://remixicon.com" target="_blank">Remix Icons</a>
                </div>
            </block>
            <block class="settings-about__block" title="Sponsors">
                <div>Kerry Tarrant</div>
            </block>
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

    .settings-about__body {
        padding: 0 var(--spacing__small);
    }

    .settings-about__header {
        text-align: center;
        margin-bottom: var(--spacing__large);
    }

    .settings-about__title {
        text-transform: uppercase;
        letter-spacing: 0.2em;
    }

    .settings-about__logo {
        width: 96px;
    }

    .settings-about__block {
        
        &:not(:last-of-type) {
            margin-bottom: var(--spacing__small);
        }

        & .block__title {
            color: var(--font__colour--meta);
        }
    }

    .settings-about__details-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: var(--spacing__x-small) var(--spacing__small);
    }

</style>