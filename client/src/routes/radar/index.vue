<template>
    <div class="route radar-index" layout="column top-stretch">
        <div>
            <container>
                <weather-actions></weather-actions>
            </container>
        </div>
        <div self="size-x1">
            <radar class="radar-index__radar"
                v-if="forecast"
                :latitude="forecast.lat.raw"
                :longitude="forecast.lon.raw"
                :timestamps="forecast.radar.raw.timestamps"
                interactive>
            </radar>
        </div>
    </div>
</template>

<script lang="ts">
import WeatherActions from '../../components/weather/actions.vue';
import Radar from '../../components/weather/radar.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    forecast
} from '../../store/index';

export default defineComponent({

    components: {
        WeatherActions,
        Radar
    },
    
    setup() {
        return {
            forecast
        };
    }

});
</script>

<style lang="scss">

    .radar-index__radar {
        border-radius: 0;
    }

</style>