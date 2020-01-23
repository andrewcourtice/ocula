<template>
    <div class="chart temperature-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import chart from './_base/chart';

import {
    SplineChart
} from '@ocula/charts';

import {
    dateFormat,
    dateFromUnix
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
            return this.value.map(({ time, temperature }) => ({
                label: time,
                value: Math.round(temperature)
            }));
        }

    }

});
</script>