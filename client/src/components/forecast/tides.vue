<template>
    <div class="forecast-tides">
        <line-chart class="forecast-tides__chart" :data="tides.heights" :options="chartOptions"></line-chart>
    </div>
</template>

<script lang="ts">
import TIDES_CHART_OPTIONS from '../../constants/forecast/tides-chart-options';

import LineChart from '../charts/line.vue'; 

import {
    computed,
    defineComponent
} from 'vue';

import {
    forecast
} from '../../store';

export default defineComponent({

    components: {
        LineChart
    },
   
    setup(props) {
        const tides = computed(() => forecast.value.tides);

        return {
            tides,
            chartOptions: TIDES_CHART_OPTIONS
        };
    }

});
</script>