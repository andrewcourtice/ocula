<template>
    <card class="weather-trends-card">
        <template #header>
            <div layout="row center-justify">
                <strong>Trends</strong>
                <div layout="row center-right">
                    <label for="temp-chart-option">
                        <input type="radio" id="temp-chart-option" name="chart" v-model="chart" :value="charts.temperature">Temp
                    </label>
                    <label for="rainfall-chart-option" class="margin__left--x-small">
                        <input type="radio" id="rainfall-chart-option" name="chart" v-model="chart" :value="charts.rainfall">Rain
                    </label>
                    <label for="wind-chart-option" class="margin__left--x-small">
                        <input type="radio" id="wind-chart-option" name="chart" v-model="chart" :value="charts.wind">Wind
                    </label>
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
import WindChart from '../charts/wind.vue';

import weatherController from '../../../controllers/weather';

const CHARTS = {
    temperature: 'temperature',
    rainfall: 'rainfall',
    wind: 'wind'
};

const CHART_MAP = {
    [CHARTS.temperature]: TemperatureChart,
    [CHARTS.rainfall]: RainfallChart,
    [CHARTS.wind]: WindChart
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

        & .chart {
            min-height: 196px;
        }
    }

</style>