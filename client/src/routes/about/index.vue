<template>
    <div class="about-route">
        <section class="text--centre">
            <img class="about-route__logo" :src="logo" alt="Ocula">
            <h1>{{ manifest.title }}</h1>
            <div>{{ manifest.description }}</div>
        </section>
        <block title="Application" class="margin__top--large">
            <div class="about-route__details-grid">
                <strong>Version</strong>
                <div>{{ manifest.version }}</div>
                <strong>Author</strong>
                <div>{{ manifest.author }}</div>
                <strong>Licence</strong>
                <div>{{ manifest.license }}</div>
                <strong>Source</strong>
                <a :href="repository" target="_blank">Github</a>
            </div>
        </block>
        <block title="Credits" class="margin__top--large">
            <div class="about-route__details-grid">
                <strong>Forecast Data</strong>
                <a href="https://darksky.net" target="_blank">DarkSky</a>
                <strong>Maps/Geocoding</strong>
                <a href="https://www.mapbox.com" target="_blank">Mapbox</a>
                <strong>Map Tiles</strong>
                <a href="https://www.rainviewer.com" target="_blank">RainViewer</a>
                <strong>Logo Design</strong>
                <a href="https://github.com/ethanroxburgh" target="_blank">Ethan Roxburgh</a>
                <strong>Icons</strong>
                <a href="https://feathericons.com/" target="_blank">Feather Icons</a>
            </div>
        </block>
        <footer class="margin__top--large text--centre">
            <small class="text--meta">Psalm 147:8</small>
        </footer>
    </div>   
</template>

<script lang="ts">
import manifest from '../../../package.json';
import logo from '../../assets/images/ocula-192.svg';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    setup() {
        return {
            logo,
            manifest
        };
    }

});
</script>

<style lang="scss">

    .about-route__logo {
        width: 96px;
    }

    .about-route__details-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: var(--spacing__x-small) var(--spacing__small);
    }

</style>