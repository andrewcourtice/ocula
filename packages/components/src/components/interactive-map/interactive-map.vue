<template>
    <div class="map" ref="element">
        <loader class="map__loader" v-if="loading" />
        <slot></slot>
    </div>
</template>

<script lang="ts">
import 'leaflet/dist/leaflet.css';

import Loader from '../loader/loader.vue';

import getListeners from '../../helpers/get-listeners';

import {
    TaskQueue
} from '@ocula/task-queue';

import {
    defineComponent,
    ref,
    watch,
    onMounted,
    onUnmounted,
    provide,
    PropType
} from 'vue';

import {
    Map as InteractiveMap,
    TileLayer,
    Layer
} from 'leaflet';

const STYLE = {
    light: 'light-v10',
    dark: 'dark-v10',
    streets: 'streets-v10'
};

export default defineComponent({

    props: {

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        zoom: {
            type: Number,
            default: 8
        },

        style: {
            type: String,
            default: 'light',
            //validator: value => value in STYLE
        },

    },

    setup(props, { attrs, emit }) {
        let map: InteractiveMap;

        const taskQueue = new TaskQueue(true);
        const element = ref<HTMLElement>(null);
        const loading = ref(false);

        const listeners = getListeners(attrs);

        const baseLayer = new TileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            id: `mapbox/${STYLE[props.style]}`,
            accessToken: process.env.MAPBOX_API_KEY,
            tileSize: 256
        });

        function handleListeners(invokee: Function) {
            if (!map) {
                return;
            }

            Object.keys(listeners).forEach(key => {
                invokee.call(map, key, listeners[key]);
            });
        }
        
        function addLayer(layer: Layer): void {
            const task = () => layer.addTo(map);

            if (!map) {
                return taskQueue.add(task);
            }

            task();
        }

        function removeLayer(layer: Layer): void {
            const task = () => layer.removeFrom(map);

            if (!map) {
                return taskQueue.add(task);
            }

            task();
        }

        function updateLocation(): void {
            map.flyTo({
                lat: props.latitude,
                lng: props.longitude
            }, props.zoom);
        }

        onMounted(() => {
            map = new InteractiveMap(element.value, {
                zoom: props.zoom,
                zoomControl: false,
                center: {
                    lat: props.latitude,
                    lng: props.longitude
                }
            });

            handleListeners(map.on);

            baseLayer.addTo(map);
            taskQueue.run();
        });

        onUnmounted(() => handleListeners(map.off));

        watch([
            () => props.latitude,
            () => props.longitude,
            () => props.zoom
        ], updateLocation);

        watch(() => props.style, value => {
            baseLayer.options.id = `mapbox/${STYLE[value]}`;
        });

        provide('map', {
            addLayer,
            removeLayer
        });

        return {
            element,
            loading,
            updateLocation
        };
    }

});
</script>

<style lang="scss">

    .map {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .map__loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

</style>