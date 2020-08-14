<template>
    <spline-chart class="trend-chart" :data="data" :options="options"></spline-chart>
</template>

<script lang="ts">
import TRENDS from '../../constants/trends';

import SplineChart from '../charts/spline.vue';

import {
    dateFromUnix,
    dateFormat,
    objectMerge
} from '@ocula/utilities';

import {
    defineComponent, computed
} from 'vue';

const BASE_OPTIONS = {
    scales: {
        x: {
            type: 'time',
            value: ({ dt }) => dateFromUnix(dt.raw),
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
                value: ({ temp }) => temp.raw
            }
        },
        colours: {
            line: '#FF9900'
        }
    },
    [TRENDS.rainfall]: {
        scales: {
            y: {
                value: ({ pop }) => pop.raw
            }
        },
        colours: {
            line: '#47B1FA'
        }
    },
    [TRENDS.uv]: {
        scales: {
            y: {
                value: ({ temp }) => temp.raw
            }
        },
        colours: {
            line: '#FF9900'
        }
    },
    [TRENDS.wind]: {
        scales: {
            y: {
                value: ({ windSpeed }) => windSpeed.raw
            }
        },
        colours: {
            line: '#47B1FA'
        }
    }
}

export default defineComponent({
    
    components: {
        SplineChart
    },

    props: {

        type: {
            type: String
        },

        data: {
            type: Array
        }

    },

    setup(props) {
        const options = computed(() => objectMerge(BASE_OPTIONS, OPTIONS[props.type]));

        return {
            options
        };
    }

});
</script>