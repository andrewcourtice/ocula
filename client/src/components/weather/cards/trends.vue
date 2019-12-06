<template>
    <card class="weather-trends-card">
        <template #header>
            <div layout="row center-justify">
                <strong>Trends</strong>
                <div layout="row center-right">
                    <span><input type="radio" name="chart" v-model="chart" :value="charts.temperature">Temp</span>
                    <span><input type="radio" name="chart" v-model="chart" :value="charts.rainfall">Wind</span>
                </div>
            </div>
        </template>
        <component :is="component"></component>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import TemperatureChart from '../charts/temperature.vue';
import RainfallChart from '../charts/rainfall.vue';

import weatherController from '../../../controllers/weather';

const CHARTS = {
    temperature: 'temperature',
    rainfall: 'rainfall'
}

const CHART_MAP = {
    [CHARTS.temperature]: TemperatureChart,
    [CHARTS.rainfall]: RainfallChart
};

export default Vue.extend({

    data() {
        return {
            chart: CHARTS.temperature,
            charts: CHARTS
        };
    },

    computed: {

        component() {
            return CHART_MAP[this.chart];
        }

    }

});
</script>

<style lang="scss">

    .weather-trends-card {

        & .card__body {
            padding: 0;
        }
    }

</style>