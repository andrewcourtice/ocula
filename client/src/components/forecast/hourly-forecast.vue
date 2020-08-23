<template>
    <div class="forecast-hourly">
        <div class="forecast-hourly__header" layout="rows center-left">
            <icon-button class="menu-item forecast-hourly__option"
                v-for="trend in trends"
                layout="row center-left"
                :key="trend.key"
                :icon="trend.icon"
                :class="getOptionClass(trend.key)"
                @click="setTrend(trend.key)">
            </icon-button>
        </div>
        <div class="forecast-hourly__body-wrapper">
            <div class="forecast-hourly__body" :style="bodyStyle">
                <line-chart class="forecast-hourly__chart" :data="hours" :options="trend.chartOptions" />

                <div class="forecast-hourly__now" layout="column center-left">
                    <span class="forecast-hourly__now-label">Now</span>
                </div>
                <!-- <div class="forecast-hourly__column"></div> -->
                <template v-for="hour in hours.slice(1, -1)">
                    <div class="forecast-hourly__column text--no-wrap" :key="getKey(hour, 'time')">
                        <small>{{ getTime(hour) }}</small>
                    </div>
                    <div class="forecast-hourly__column" :key="getKey(hour, 'icon')">
                        <icon :name="getIcon(hour.weather.id.raw)"/>
                    </div>
                    <!-- <div class="forecast-hourly__column" :key="getKey(hour, 'description')">
                        <small class="text--x-small">{{ hour.weather.description.formatted }}</small>
                    </div> -->
                </template>
                <div class="forecast-hourly__later" layout="column center-right">
                    <span class="forecast-hourly__later-label">Later</span>
                </div>
                <!-- <div class="forecast-hourly__column"></div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TREND from '../../enums/forecast/trend';
import TRENDS from '../../constants/forecast/trends';

import LineChart from '../charts/line.vue';

import getIcon from '../../helpers/get-icon';

import {
    dateFromUnix,
    dateFormat,
    objectMerge,
    numberRound
} from '@ocula/utilities';

import {
    defineComponent,
    ref,
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
    Formatted,
    IMappedForecastHour
} from '../../interfaces/state';

export default defineComponent({
    
    components: {
        LineChart
    },

    setup(props) {
        const type = ref(TREND.temperature);

        const trends = Object.keys(TRENDS).map(key => {
            const {
                icon,
                label
            } = TRENDS[key];

            return {
                key,
                icon,
                label
            };
        })

        const hours = computed(() => forecast.value.hourly);
        const trend = computed(() => TRENDS[type.value]);

        const bodyStyle = computed(() => ({
            gridTemplateColumns: `1.5rem repeat(${hours.value.length - 2}, 3rem) 1.5rem`
        }));

        function getKey(hour: Formatted<IMappedForecastHour>, key: string): string {
            return `${key}-${hour.dt.raw}`;
        }

        function getTime(hour: Formatted<IMappedForecastHour>): string {
            return format.value.time(hour.dt.formatted as any, 'h a');
        }

        function getOptionClass(key: TREND): string {
            return key === type.value && 'menu-item--active';
        }

        function setTrend(value: TREND): void {
            type.value = value;
        }

        return {
            type,
            hours,
            trends,
            trend,
            bodyStyle,
            getKey,
            getTime,
            getIcon,
            getOptionClass,
            setTrend
        };
    }

});
</script>

<style lang="scss">

    .forecast-hourly__header {
        padding: 0 var(--spacing__small);
    }

    .forecast-hourly__option {
        width: auto;
    }

    .forecast-hourly__body-wrapper {
        overflow: hidden;
        overflow-x: auto;
    }

    .forecast-hourly__body {
        display: inline-grid;
        padding-bottom: var(--spacing__small);
        grid-template-rows: repeat(3, auto);
        grid-auto-flow: column;
        row-gap: var(--spacing__x-small);
        width: auto;
    }

    .forecast-hourly__chart {
        grid-column: 1 / -1;
        height: 196px;
    }

    .forecast-hourly__column {
        padding: 0 var(--spacing__xx-small);
        text-align: center;
    }

    .forecast-hourly__now,
    .forecast-hourly__later {
        grid-row: 2 / -1;      
    }

    .forecast-hourly__now-label,
    .forecast-hourly__later-label {
        color: var(--font__colour--meta);
        font-size: var(--font__size--x-small);
        text-transform: uppercase;
        transform-origin: center;
    }

    .forecast-hourly__now-label {
        transform: rotate(90deg);
    }
    
    .forecast-hourly__later-label {
        transform: rotate(-90deg);
    }

</style>