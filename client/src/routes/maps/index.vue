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
                            <loader v-if="updating"/>
                        </div>
                    </icon-button>
                    <icon-button icon="focus-3-line" v-tooltip:left="'Recentre'" @click.native="recentre"></icon-button>
                </container>
            </div>
        </div>
        <div class="maps-index__body" layout="column justify-stretch" self="size-x1">
            <div self="size-x1">
                <maps-drawer class="maps-index__drawer"/>
                <interactive-map class="maps-index__map"
                    ref="interactiveMap"
                    v-if="forecast"
                    :latitude="forecast.lat.raw"
                    :longitude="forecast.lon.raw"
                    :style="theme.core.mapStyle"
                    @sourcedataloading="onSourceDataLoading"
                    @idle="onIdle">
                    <interactive-map-tile-layer v-for="(layer, index) in map.layers"
                        class="maps-index__map-layer"
                        :key="layer.id"
                        :url="layer.url"
                        :opacity="getLayerOpacity(layer, index)"/>
                </interactive-map>
            </div>
            <div class="maps-index__controls" v-show="map.layers.length > 1">
                <container class="maps-index__controls-container" layout="row center-justify">
                    <icon-button class="maps-index__control-loop" icon="arrow-right-line" @click.native="loop"></icon-button>
                    <div class="padding__horizontal--small" self="size-x1">
                        <input class="maps-index__control-slider" type="range" v-model.number="layerIndex" min="0" :max="map.layers.length - 1" step="1">
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
    watch
} from 'vue';

import {
    state,
    theme,
    forecast,
    format
} from '../../store';

import {
    typeIsFunction
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
        const interactiveMap = ref(null);

        let loopHandle;
        let updating = ref(false);
        let layerIndex = ref(0);

        const map = computed(() => {
            let {
                layers,
                ...map
            } = MAPS[props.type || state.settings.maps.default];

            if (typeIsFunction(layers) && forecast.value) {
                layers = layers(forecast.value, format.value);
            }

            return {
                ...map,
                layers
            };
        });

        const layer = computed(() => map.value.layers[layerIndex.value] || map.value.layers[0]);

        function onSourceDataLoading() {
            updating.value = true;
        }

        function onIdle() {
            updating.value = false;
        }

        function recentre() {
            interactiveMap.value.updateLocation();
        }

        function getLayerOpacity(layer, index: number): number {
            return +(index === layerIndex.value); 
        }

        function stop() {
            window.clearInterval(loopHandle);
            loopHandle = null;
        }

        function start() {
            loopHandle = window.setInterval(() => {
                layerIndex.value = layerIndex.value === map.value.layers.length - 1 ? 0 : layerIndex.value + 1;
            }, 500);
        }

        function loop() {
            if (loopHandle) {
                return stop();
            }

            if (map.value.layers.length > 1) {
                start();
            }
        }

        watch(map, value => {
            stop();
            layerIndex.value = value.layers.length - 1;
        }, {
            immediate: true
        });

        return {
            theme,
            forecast,
            map,
            layerIndex,
            layer,
            interactiveMap,
            updating,
            onSourceDataLoading,
            onIdle,
            recentre,
            getLayerOpacity,
            loop,
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

    .maps-index__map-layer {
        transition: opacity 150ms linear;
    }

    .maps-index__control-slider {
        display: block;
        width: 100%;
    }

</style>