<template>
    <div class="map" ref="element">
        <loader class="map__loader" v-if="loading" />
        <slot></slot>
    </div>
</template>

<script lang="ts">
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
    provide,
    PropType,
    onBeforeUnmount
} from 'vue';

import type {
    AnyPaint,
    Layer,
    Layout
} from 'mapbox-gl';

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
            default: 6
        },

        style: {
            type: String,
            default: 'light',
            //validator: value => value in STYLE
        },

        interactive: {
            type: Boolean,
            default: true
        }

    },

    setup(props, { attrs }) {
        let map: mapboxgl.Map;

        const element = ref<HTMLElement>(null);
        const listeners = getListeners(attrs);
        const taskQueue = new TaskQueue(true);
        const loading = ref(false);

        async function loadMapbox() {
            loading.value = true;

            try {
                const [
                    mapboxModule
                ] = await Promise.all([
                    import(
                    /* webpackChunkName: 'mapbox' */
                    /* webpackPrefetch: true */
                    'mapbox-gl'),
                    import(
                    /* webpackChunkName: 'mapbox' */
                    /* webpackPrefetch: true */
                    'mapbox-gl/dist/mapbox-gl.css'),
                ]);
                    
                const mapboxgl = mapboxModule.default;

                mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

                return mapboxgl;
            } finally {
                loading.value = false;
            }
        }

        function updateStyle(style): void {
            map.setStyle(`mapbox://styles/mapbox/${STYLE[style]}`);            
        }

        function handleListeners(invokee: Function) {
            Object.keys(listeners).forEach(key => {
                invokee.call(map, key, event => listeners[key](event, map));
            });
        }
        
        function addLayer(layer: Layer): void {
            const task = () => map.addLayer(layer);

            if (!map) {
                return taskQueue.add(task);
            }

            task();
        }

        function removeLayer(layer: Layer): void {
            const task = () => {
                map.removeLayer(layer.id);
                map.removeSource(layer.id);
            };

            if (!map) {
                return taskQueue.add(task);
            }

            task();
        }

        function invokeLayerUpdate(invokee: string, layerId: string, obj: Record<string, any>): void {
            if (!map) {
                return;
            }

            for (const key in obj) {
                map[invokee].call(map, layerId, key, obj[key]);
            }
        }

        function updateLayout(layerId: string, layout: Layout): void {
            invokeLayerUpdate('setLayoutProperty', layerId, layout);
        }

        function updatePaint(layerId: string, paint: AnyPaint): void {
            invokeLayerUpdate('setPaintProperty', layerId, paint);
        }

        function on(event: string, callback: (event: any) => void) {
            map && map.on(event, callback);
        }

        function off(event: string, callback: (event: any) => void) {
            map && map.off(event, callback);
        }

        function once(event: string, callback: (event: any) => void) {
            map && map.once(event, callback);
        }

        function resize() {
            map && map.resize();
        }

        function updateLocation() {
            if (!map) {
                return;
            }

            map.easeTo({
                zoom: props.zoom,
                center: [
                    props.longitude,
                    props.latitude
                ]
            });
        }

        onMounted(async () => {
            const mapboxgl = await loadMapbox();

            map = new mapboxgl.Map({
                container: element.value,
                style: `mapbox://styles/mapbox/${STYLE[props.style]}`,
                zoom: props.zoom,
                interactive: props.interactive,
                center: [
                    props.longitude,
                    props.latitude
                ]
            });

            map.on('load', () => {
                taskQueue.run();
            });

            handleListeners(map.on);
        });

        onBeforeUnmount(() => handleListeners(map.off));

        watch([
            () => props.latitude,
            () => props.longitude,
            () => props.zoom
        ], updateLocation);

        watch(() => props.style, updateStyle);

        provide('map', {
            addLayer,
            removeLayer,
            updateLayout,
            updatePaint
        });

        return {
            element,
            loading,
            on,
            off,
            once,
            resize,
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