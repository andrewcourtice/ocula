<template>
    <card class="weather-trends-card">
        <template #header>
            <strong>Temperature</strong>
        </template>
        <spline-chart :data="data" :options="options"></spline-chart>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import SplineChart from '../../charts/spline/index.vue';

import weatherController from '../../../controllers/weather';

export default Vue.extend({

    data() {
        return {
            options: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }
            }
        };
    },

    computed: {

        data() {
            const temperature = weatherController.outlook.current.temperature;

            if (!temperature) {
                return [];
            }

            return temperature.map(entry => ({
                label: entry.dateTime,
                value: entry.temperature
            }));
        }

    },
    
    components: {
        SplineChart
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