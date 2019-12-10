<template>
    <div class="chart wind-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import chart from './_base/chart';

import {
    SplineChart
} from '@ocula/charts';

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
                    line: '#47B1FA',
                    marker: '#47B1FA',
                    label: '#AAAAAA',
                    gradient: {
                        stop1: '#47B1FA',
                        stop2: '#78D0F5',
                        stop3: '#78D0F5',
                    }
                }
            }
        };
    },

    computed: {

        data() {
            return this.value.map(({ dateTime, speed }) => ({
                label: dateFormat(new Date(dateTime), 'h aa'),
                value: Math.round(speed)
            }));
        }

    }

});
</script>