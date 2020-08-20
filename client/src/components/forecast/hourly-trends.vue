<template>
    <div class="forecast-hourly-trends">
        <div class="forecast-hourly-trends__body" :style="bodyStyle">
            <spline-chart class="forecast-hourly-trends__chart" :data="hours" :options="options" />

            <div class="forecast-hourly-trends__column"></div>
            <div class="forecast-hourly-trends__column"></div>
            <!-- <div class="forecast-hourly-trends__column"></div> -->
            <template v-for="hour in hours.slice(1, -1)">
                <div class="forecast-hourly-trends__column text--no-wrap" :key="getKey(hour, 'time')">
                    <small>{{ getTime(hour) }}</small>
                </div>
                <div class="forecast-hourly-trends__column" :key="getKey(hour, 'icon')">
                    <icon :name="getIcon(hour.weather.id.raw)"/>
                </div>
                <!-- <div class="forecast-hourly-trends__column" :key="getKey(hour, 'description')">
                    <small class="text--x-small">{{ hour.weather.description.formatted }}</small>
                </div> -->
            </template>
            <div class="forecast-hourly-trends__column"></div>
            <div class="forecast-hourly-trends__column"></div>
            <!-- <div class="forecast-hourly-trends__column"></div> -->
        </div>
    </div>
</template>

<script lang="ts">
import TRENDS from '../../enums/trends';

import SplineChart from '../charts/spline.vue';

import getIcon from '../../helpers/get-icon';

import {
    dateFromUnix,
    dateFormat,
    objectMerge
} from '@ocula/utilities';

import {
    defineComponent,
    computed
} from 'vue';

import {
    forecast,
    format
} from '../../store';

import {
    LINE_TYPE
} from '@ocula/charts';

import type {
    FormattedForecast,
    IForecastHour
} from '../../interfaces/weather';

const BASE_OPTIONS = {
    type: LINE_TYPE.spline,
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
    labels: {
        content: (value, index) => index ? Math.round(value) : null
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
            line: '#FF9900',
            marker: '#FF9900'
        }
    },
    [TRENDS.rainfall]: {
        type: LINE_TYPE.step,
        scales: {
            y: {
                value: ({ pop }) => pop.raw
            }
        },
        colours: {
            line: '#47B1FA',
            marker: '#47B1FA'
        }
    },
    [TRENDS.wind]: {
        scales: {
            y: {
                value: ({ windSpeed }) => windSpeed.raw
            }
        },
        colours: {
            line: '#47B1FA',
            marker: '#47B1FA'
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
        }

    },

    setup(props) {
        const hours = computed(() => forecast.value.hourly);
        const options = computed(() => objectMerge(BASE_OPTIONS, OPTIONS[props.type]));

        const bodyStyle = computed(() => ({
            gridTemplateColumns: `1.5rem repeat(${hours.value.length - 2}, 3rem) 1.5rem`
        }));

        function getKey(hour: FormattedForecast<IForecastHour>, key: string): string {
            return `${key}-${hour.dt.raw}`;
        }

        function getTime(hour: FormattedForecast<IForecastHour>): string {
            return format.value.time(hour.dt.formatted as any, 'h a');
        }

        return {
            hours,
            options,
            bodyStyle,
            getKey,
            getTime,
            getIcon
        };
    }

});
</script>

<style lang="scss">

    .forecast-hourly-trends {
        overflow: hidden;
        overflow-x: auto;
    }

    .forecast-hourly-trends__body {
        display: inline-grid;
        grid-template-rows: repeat(3, auto);
        grid-auto-flow: column;
        row-gap: var(--spacing__x-small);
        width: auto;
    }

    .forecast-hourly-trends__chart {
        grid-column: 1 / -1;
        height: 196px;
    }

    .forecast-hourly-trends__column {
        padding: 0 var(--spacing__xx-small);
        text-align: center;
    }

</style>