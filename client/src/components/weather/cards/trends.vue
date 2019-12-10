<template>
    <card class="weather-trends-card" v-if="trends">
        <template #header>
            <div layout="row center-justify">
                <strong>Trends</strong>
                <div layout="row center-right">
                    <label v-for="(value, key) in trends" :key="key" :for="key" @click.stop>
                        <input type="radio" :id="key" name="trend" v-model="currentTrend" :value="key"><span>{{ value.label }}</span>
                    </label>
                </div>
            </div>
        </template>
        <component :is="trend.component" :value="trend.data"></component>
    </card>
</template>

<script lang="ts">
import TRENDS from '../../../constants/trends';

import Vue from 'vue';

import TemperatureChart from '../charts/temperature.vue';
import RainfallChart from '../charts/rainfall.vue';
import WindChart from '../charts/wind.vue';

import weatherController from '../../../controllers/weather';

export default Vue.extend({

    data() {
        return {
            currentTrend: TRENDS.temperature
        };
    },

    computed: {

        trends() {
            const trends = weatherController.trends;

            if (!trends) {
                return;
            }

            return {
                [TRENDS.temperature]: {
                    label: 'Temp',
                    data: trends[TRENDS.temperature],
                    component: TemperatureChart
                },
                [TRENDS.rainfall]: {
                    label: 'Rain',
                    data: trends[TRENDS.rainfall],
                    component: RainfallChart
                },
                [TRENDS.wind]: {
                    label: 'Wind',
                    data: trends[TRENDS.wind],
                    component: WindChart
                }
            }
        },

        trend() {
            return this.trends[this.currentTrend];
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