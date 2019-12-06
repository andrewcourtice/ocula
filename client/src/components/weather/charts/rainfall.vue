<template>
    <div class="rainfall-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    SplineChart
} from '@ocula/charts';

import weatherController from '../../../controllers/weather';

import chart from './_base/chart';

export default Vue.extend({

    extends: chart(SplineChart),

    data() {
        return {
            options: {
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                colours: {
                    line: '#FF9900',
                    gradient: {
                        stop1: '#FF9900',
                        stop2: '#FFCD32',
                        stop3: '#FFE287',
                    }
                }
            }
        };
    },

    computed: {

        data() {
            const wind = weatherController.outlook.current.wind;

            if (!wind) {
                return [];
            }

            return wind.map(entry => ({
                label: entry.dateTime,
                value: entry.speed
            }));
        }

    }

});
</script>

<style lang="scss">

    .rainfall-chart {
        min-height: 196px;
    }

</style>