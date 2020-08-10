<template>
    <spline-chart class="trend-chart" :data="data" :options="options"></spline-chart>
</template>

<script lang="ts">
import TRENDS from '../../../constants/trends';

import SplineChart from '../../core/charts/spline.vue';

import {
    dateFromUnix,
    dateFormat,
    objectMerge
} from '@ocula/utilities';

const BASE_OPTIONS = {
    scales: {
        x: {
            type: 'time',
            value: ({ raw }) => dateFromUnix(raw.time),
            format: date => dateFormat(date, 'h a')
        },
        y: {
            type: 'linear',
            ticks: 5
        }
    },
    colours: {
        axis: false,
        tick: '#AAA'
    }
};

const OPTIONS = {
    [TRENDS.temperature]: {
        scales: {
            y: {
                value: ({ raw }) => raw.temperature
            }
        },
        colours: {
            line: '#FF9900'
        }
    },
    [TRENDS.rainfall]: {
        scales: {
            y: {
                value: ({ raw }) => raw.precipProbability
            }
        },
        colours: {
            line: '#47B1FA'
        }
    },
    [TRENDS.uv]: {
        scales: {
            y: {
                value: ({ raw }) => raw.uvIndex
            }
        },
        colours: {
            line: '#FF9900'
        }
    },
    [TRENDS.wind]: {
        scales: {
            y: {
                value: ({ raw }) => raw.windSpeed
            }
        },
        colours: {
            line: '#47B1FA'
        }
    }
}

export default {
    
    props: {

        type: {
            type: String
        },

        data: {
            type: Array
        }

    },

    computed: {

        options() {
            return objectMerge(BASE_OPTIONS, OPTIONS[this.type]);
        }

    },

    components: {
        SplineChart
    }

};
</script>