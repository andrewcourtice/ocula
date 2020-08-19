<template>
    <div class="route maps-index" layout="column top-stretch">
        <div>
            <container>
                <weather-actions></weather-actions>
            </container>
            <div class="maps-index__options" @click="changeMap">
                <container class="maps-index__options-container">
                    <div layout="row center-left" >
                        <icon :name="map.icon"/>
                        <div class="margin__left--x-small">{{ map.label }}</div>
                    </div>
                </container>
            </div>
        </div>
        <div class="maps-index__body" self="size-x1">
            <maps-drawer class="maps-index__maps-drawer"/>
            <interactive-map class="maps-index__map"
                v-if="forecast"
                :latitude="forecast.lat.raw"
                :longitude="forecast.lon.raw"
                :style="theme.core.mapStyle"
                :tile-source="map.options"
                interactive>
            </interactive-map>
        </div>
    </div>
</template>

<script lang="ts">
import MAP from '../../enums/map';
import MAPS from '../../constants/maps';

import WeatherActions from '../../components/weather/actions.vue';
import MapsDrawer from '../../components/drawers/maps.vue';

import applicationController from '../../controllers/application';

import {
    defineComponent,
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
        const map = computed(() => {
            const map = MAPS[props.type || state.settings.defaultMap];

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

        return {
            theme,
            forecast,
            map,
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
        padding: var(--spacing__small) var(--spacing__large);
    }

    .maps-index__body {
        position: relative;
    }

    .maps-index__maps-drawer {
        position: absolute;
    }

</style>