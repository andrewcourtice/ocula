<template>
    <div class="weather-trends" v-if="trends">
        <card v-for="(trend, key) in trends" :key="key">
            <template #header>
                <strong>{{ trend.label }}</strong>
            </template>
            <component :is="trend.component" :value="trend.data"></component>
        </card>
    </div>
</template>

<script lang="ts">
import TRENDS from '../../constants/trends';

import Vue from 'vue';

import TemperatureChart from '../../components/weather/charts/temperature.vue';
import RainfallChart from '../../components/weather/charts/rainfall.vue';
import WindChart from '../../components/weather/charts/wind.vue';
import UvChart from '../../components/weather/charts/uv.vue';

import weatherController from '../../controllers/weather';

import refreshable from './_base/refreshable';

export default Vue.extend({

    extends: refreshable(),

    computed: {

        trends() {
            const trends = weatherController.trends;

            if (!trends) {
                return;
            }

            return {
                [TRENDS.temperature]: {
                    label: 'Temperature',
                    data: trends[TRENDS.temperature],
                    component: TemperatureChart
                },
                [TRENDS.rainfall]: {
                    label: 'Rainfall Probability',
                    data: trends[TRENDS.rainfall],
                    component: RainfallChart
                },
                [TRENDS.wind]: {
                    label: 'Wind',
                    data: trends[TRENDS.wind],
                    component: WindChart
                },
                [TRENDS.uv]: {
                    label: 'UV Index',
                    data: trends[TRENDS.uv],
                    component: UvChart
                }
            };
        }

    },

    methods: {

        async load(locationId: number) {    
            await weatherController.loadTrends(locationId);
        }

    }

});
</script>

<style lang="scss">

    .weather-trends {

        & .card:not(:last-child) {
            margin-bottom: var(--spacing__small);
        }

        & .card__body {
            padding: 0;
        }
    }

</style>