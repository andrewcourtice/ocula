<template>
    <div class="chart temperature-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    SplineChart
} from '@ocula/charts';

import chart from './_base/chart';

import weatherController from '../../../controllers/weather';

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
                    marker: '#FF9900',
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
            const temperature = weatherController.outlook.current.temperature;

            if (!temperature) {
                return [];
            }

            return temperature.map(entry => ({
                label: entry.dateTime,
                value: entry.temperature
            }));
        }

    }

});
</script>