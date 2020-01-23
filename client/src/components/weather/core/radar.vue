<template>
    <div class="radar"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../../../controllers/weather';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

export default Vue.extend({

    computed: {

        location() {
            return weatherController.location;
        },

        radar() {
            return weatherController.radar;
        }

    },

    mounted() {
        const {
            latitude,
            longitude
        } = this.location;

        const map = new mapboxgl.Map({
            container: this.$el,
            style: 'mapbox://styles/mapbox/light-v10',
            zoom: 6,
            center: [
                longitude,
                latitude
            ]
        });

        map.on('load', () => {
            
            const layers = map.getStyle().layers;
            const firstLayer = layers.find(layer => layer.type === 'symbol');

            map.addSource('raster-tile', {
                type: 'raster',
                tiles: [this.radar.tileURL],
                tileSize: 256
            });

            map.addLayer({
                id: "simple-tiles",
                type: "raster",
                source: 'raster-tile',
                minzoom: 0,
                maxzoom: 22
            }, firstLayer.id);

        });
    }

});
</script>

<style lang="scss">

    .radar {
        position: relative;
        width: 100%;
        border-radius: 3px;
        overflow: hidden;

        &::after {
            display: block;
            content: ' ';
            padding-bottom: 100%;
        }
    }

</style>