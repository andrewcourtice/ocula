<template>
    <div class="route radar-index" layout="column top-stretch">
        <div>
            <container>
                <weather-actions>
                    <div @click="toggleType">
                        <icon name="eye" />
                    </div>
                </weather-actions>
            </container>
        </div>
        <div self="size-x1">
            <interactive-map class="radar-index__radar"
                v-if="forecast"
                :latitude="forecast.lat.raw"
                :longitude="forecast.lon.raw"
                :style="theme.core.mapStyle"
                :tile-source="tileSource"
                interactive>
            </interactive-map>
        </div>
    </div>
</template>

<script lang="ts">
import WeatherActions from '../../components/weather/actions.vue';

import {
    defineComponent,
    ref,
    computed
} from 'vue';

import {
    theme,
    forecast
} from '../../store';
import { typeIsFunction } from '@ocula/utilities';

function getOwmTileUrl(layer: string) {
    return `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${process.env.OWM_API_KEY}`;
}

const mapTypes = {
    radar: {
        tiles: forecast => {
            const timestamps = forecast.radar.raw.timestamps;
            const timestamp = timestamps[timestamps.length - 1];
            
            return `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/0_0.png`;
        }
    },
    precip: {
        tiles: getOwmTileUrl('precipitation_new')
    },
    cloud: {
        tiles: getOwmTileUrl('clouds_new')
    },
    temp: {
        tiles: getOwmTileUrl('temp_new')
    },
    wind: {
        tiles: getOwmTileUrl('wind_new')
    },
    pressure: {
        tiles: getOwmTileUrl('pressure_new')
    }
};

export default defineComponent({

    components: {
        WeatherActions
    },
    
    setup() {
        const type = ref('radar');

        const tileSource = computed(() => {
            let {
                tiles,
                ...mapType
            } = mapTypes[type.value];

            if (typeIsFunction(tiles)) {
                tiles = tiles(forecast.value);
            }

            return {
                tiles,
                mapType
            };
        });

        function toggleType() {
            let value = 'radar';

            if (type.value === 'radar') {
                value = 'temp';
            }

            type.value = value;
        }

        return {
            theme,
            forecast,
            tileSource,
            toggleType
        };
    }

});
</script>

<style lang="scss">

    .radar-index__radar {
        border-radius: 0;
    }

</style>