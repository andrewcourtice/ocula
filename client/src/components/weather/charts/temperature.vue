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

import {
    dateFormat
} from '@ocula/utilities';

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
                    label: '#AAAAAA',
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
            return this.value.map(({ dateTime, temperature }) => ({
                label: dateFormat(new Date(dateTime), 'h aa'),
                value: Math.round(temperature)
            }));
        }

    }

});
</script>