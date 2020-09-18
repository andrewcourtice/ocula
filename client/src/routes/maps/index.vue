<template>
    <div class="route maps-index" layout="column top-stretch">
        <div>
            <container>
                <weather-actions></weather-actions>
            </container>
            <div class="maps-index__options">
                <container class="maps-index__options-container" layout="row center-justify">
                    <icon-button class="maps-index__drawer-button" self="size-x1" :icon="map.icon" @click.native="changeMap">
                        <div layout="row center-justify">
                            <div>{{ map.label }}</div>
                            <loader v-if="status.loading"/>
                        </div>
                    </icon-button>
                    <icon-button icon="focus-3-line" v-tooltip:left="'Recentre'" @click.native="recentre"></icon-button>
                </container>
            </div>
        </div>
        <div class="maps-index__body" layout="column justify-stretch" self="size-x1">
            <div self="size-x1">
                <maps-drawer class="maps-index__drawer"/>
                <mapbox-map class="maps-index__map"
                    ref="mapboxMap"
                    v-if="forecast"
                    :latitude="forecast.lat.raw"
                    :longitude="forecast.lon.raw"
                    :style="theme.core.mapStyle"
                    @movestart="onMoveStart"
                    @moveend="onMoveEnd"
                    @idle="onIdle"
                    @sourcedataloading="onSourceDataLoading">
                    <mapbox-raster-layer v-for="layer in layers"
                        class="maps-index__map-layer"
                        :key="layer.id"
                        :id="layer.id"
                        :tiles="[layer.url]"
                        :layout="layer.layout"
                        :paint="layer.paint"/>
                </mapbox-map>
            </div>
            <div class="maps-index__controls" v-if="canPlay">
                <container class="maps-index__controls-container" layout="row center-justify">
                    <icon-button class="maps-index__control-loop" :icon="controlIcon" @click.native="togglePlaying"></icon-button>
                    <div class="padding__horizontal--small" self="size-x1">
                        <input class="maps-index__control-slider"
                            v-model.number="layerIndex"
                            type="range"
                            min="0"
                            step="1"
                            :max="layers.length - 1"
                            :disabled="status.loading">
                    </div>
                    <div class="maps-index__control-label">{{ layer.label }}</div>
                </container>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import MAP from '../../enums/maps/map';
import MAPS from '../../constants/maps/maps';

import WeatherActions from '../../components/weather/actions.vue';
import MapsDrawer from '../../components/drawers/maps.vue';

import applicationController from '../../controllers/application';

import {
    defineComponent,
    ref,
    computed,
    PropType,
    watch,
    reactive
} from 'vue';

import {
    state,
    theme,
    forecast,
    format
} from '../../store';

import {
    typeIsFunction,
    numberClamp
} from '@ocula/utilities';

export default defineComponent({

    components: {
        WeatherActions,
        MapsDrawer
    },

    props: {

        type: {
            type: String as PropType<MAP>
        }

    },
    
    setup(props) {
        const mapboxMap = ref(null);

        let moveHandle = null;
        let intervalHandle = null;
        let resumePlaying = false;

        const status = reactive({
            loading: false,
            playing: false,
        });

        let layerIndex = ref(0);

        const map = computed(() => {
            let {
                layers,
                ...other
            } = MAPS[props.type || state.settings.maps.default];

            if (typeIsFunction(layers) && forecast.value) {
                layers = layers(forecast.value, format.value);
            }

            clearMoveHandle();
            stopPlaying();
            layerIndex.value = layers.length - 1;

            return {
                ...other,
                layers
            };
        });

        const layers = computed(() => {
            let {
                layers
            } = map.value;

            return layers.map((layer, index) => {
                let visibility = index === layerIndex.value ? 'visible' : 'none';
                let opacity = index === layerIndex.value ? 0.75 : 0;

                if (status.playing) {
                    visibility = 'visible';
                }

                return {
                    ...layer,
                    layout: {
                        visibility
                    },
                    paint: {
                        'raster-opacity': opacity
                    }
                };
            });
        });

        const layer = computed(() => map.value.layers[layerIndex.value]);
        const controlIcon = computed(() => status.playing ? 'stop-fill' : 'play-fill');
        const canPlay = computed(() => layers.value.length > 1);

        function recentre() {
            mapboxMap.value.updateLocation();
        }

        function onIdle() {
            status.loading = false;
        }

        function onSourceDataLoading() {
            status.loading = true;
        }

        function clearMoveHandle() {
            if (moveHandle) {
                window.clearTimeout(moveHandle);
                moveHandle = null;
            }
        }

        function runLoop() {
            intervalHandle = window.setInterval(() => {
                layerIndex.value = layerIndex.value === layers.value.length - 1 ? 0 : layerIndex.value + 1;
            }, 1000);
        }

        function startPlaying() {
            if (!mapboxMap.value) {
                return;
            }

            status.playing = true;

            mapboxMap.value.once('idle', runLoop);
        }

        function stopPlaying() {
            if (!mapboxMap.value) {
                return;
            }

            status.playing = false;

            if (intervalHandle) {
                window.clearInterval(intervalHandle);
                intervalHandle = null;
            }

            mapboxMap.value.off('idle', runLoop);
        }

        function togglePlaying() {
            if (status.playing) {
                return stopPlaying();
            }

            startPlaying();
        }

        function onMoveStart(event, map) {
            resumePlaying = status.playing;

            clearMoveHandle();
            stopPlaying();
        }

        function onMoveEnd(event, map) {
            if (resumePlaying && canPlay.value) {
                moveHandle = window.setTimeout(startPlaying, 1000);
            }
        }

        return {
            theme,
            forecast,
            map,
            status,
            layers,
            layer,
            layerIndex,
            mapboxMap,
            recentre,
            controlIcon,
            onIdle,
            onSourceDataLoading,
            onMoveStart,
            onMoveEnd,
            canPlay,
            togglePlaying,
            changeMap: applicationController.setMapType
        };
    }

});
</script>

<style lang="scss">

    .maps-index__options {
        border-top: 1px solid var(--border__colour);
        border-bottom: 1px solid var(--border__colour);
    }

    .maps-index__options-container,
    .maps-index__controls-container {
        padding: var(--spacing__x-small) var(--spacing__medium);
    }

    .maps-index__body {
        position: relative;
    }

    .maps-index__drawer {
        position: absolute;
        z-index: 1000;
    }

    .maps-index__controls {
        border-top: 1px solid var(--border__colour);
    }

    .maps-index__control-slider {
        display: block;
        width: 100%;
    }

</style>