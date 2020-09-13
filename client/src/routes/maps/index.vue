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
        <div class="maps-index__body" self="size-x1">
            <maps-drawer class="maps-index__drawer"/>
            <interactive-map class="maps-index__map"
                ref="interactiveMap"
                v-if="forecast"
                :latitude="forecast.lat.raw"
                :longitude="forecast.lon.raw"
                :style="theme.core.mapStyle"
                :tile-source="map.options"
                interactive
                @sourcedataloading="onSourceDataLoading"
                @idle="onIdle">
            </interactive-map>
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
    PropType
} from 'vue';

import {
    state,
    theme,
    forecast
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

        let updating = ref(false);

        const map = computed(() => {
            const map = MAPS[props.type || state.settings.maps.default];

            let {
                tiles
            } = map.options;

            if (typeIsFunction(tiles) && forecast.value) {
                tiles = tiles(forecast.value);
            }

            return {
                ...map,
                options: {
                    ...map.options,
                    tiles
                }
            };
        });

        function onSourceDataLoading() {
            updating.value = true;
        }

        function onIdle() {
            updating.value = false;
        }

        function recentre() {
            interactiveMap.value.updateLocation();
        }

        return {
            theme,
            forecast,
            map,
            interactiveMap,
            updating,
            onSourceDataLoading,
            onIdle,
            recentre,
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

    .maps-index__options-container {
        padding: var(--spacing__x-small) var(--spacing__medium);
    }

    .maps-index__body {
        position: relative;
    }

    .maps-index__drawer {
        position: absolute;
    }

</style>