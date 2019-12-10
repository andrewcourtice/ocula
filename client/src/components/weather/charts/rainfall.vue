<template>
    <div class="chart rainfall-chart"></div>
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
                    line: '#47B1FA',
                    marker: '#47B1FA',
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
            return this.value.map(entry => ({
                label: entry.dateTime,
                value: entry.probability
            }));
        }

    }

});
</script>