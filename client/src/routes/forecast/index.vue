<template>
    <div class="route forecast-index transition-theme-change" layout="column top-stretch" :class="theme.weather.class">
        <container class="forecast-index__header">
            <weather-actions></weather-actions>
            <section class="forecast-index__summary" v-if="forecast">
                <div class="forecast-index__summary-detail" layout="row center-justify">
                    <div>
                        <div class="forecast-index__summary-temp">{{ forecast.current.temp.formatted }}</div>
                        <div class="forecast-index__summary-description">{{ forecast.current.weather.description.formatted }}</div>
                        <div class="forecast-index__summary-feels-like margin__top--medium">Feels like {{ forecast.current.feelsLike.formatted }}</div>
                    </div>
                    <div>
                        <img :src="getFigure(forecast.current.weather.id.raw)" :alt="forecast.current.weather.description.raw">
                    </div>
                </div>
                <div class="forecast-index__summary-last-updated">
                    <small v-show="lastUpdated">Updated {{ lastUpdated }} ago</small>
                </div>
            </section>
        </container>
        <div class="forecast-index__body" self="size-x1" v-if="forecast">
            <container class="forecast-index__container">
                <section class="forecast-index__upcoming">
                    <upcoming></upcoming>
                </section>

                <section class="forecast-index__observations">
                    <observations></observations>
                </section>

                <section class="forecast-index__uv-index">
                    <uv-index></uv-index>
                </section>
                
                <section class="forecast-index__trends">
                    <div class="forecast-index__trends-options">
                        <div class="forecast-index__trends-option"
                            layout="row center-left"
                            v-for="(value, key) in trends"
                            :key="key"
                            @click="trend = key">
                            <icon :name="value.icon" />
                            <div class="margin__left--x-small">
                                <small>{{ value.label }}</small>
                            </div>
                        </div>
                    </div>
                    <hourly-trends :type="trend"></hourly-trends>
                </section>
            </container>
        </div>
    </div>
</template>

<script lang="ts">
import TRENDS from '../../enums/trends';

import WeatherActions from '../../components/weather/actions.vue';
import Upcoming from '../../components/forecast/upcoming.vue';
import Observations from '../../components/forecast/observations.vue';
import HourlyTrends from '../../components/forecast/hourly-trends.vue';
import UvIndex from '../../components/forecast/uv-index.vue';

import getIcon from '../../helpers/get-icon';
import getFigure from '../../helpers/get-figure';
import setThemeMeta from '../../helpers/set-theme-meta';

import {
    defineComponent,
    ref,
    watch
} from 'vue';

import {
    theme,
    state,
    forecast,
    format
} from '../../store';

import {
    useTimer
} from '@ocula/components';

import {
    dateFormat,
    dateFormatDistanceToNow
} from '@ocula/utilities';

const trends = {
    [TRENDS.temperature]: {
        label: 'Temperature',
        icon: 'thermometer'
    },
    [TRENDS.rainfall]: {
        label: 'Rainfall',
        icon: 'droplet'
    },
    [TRENDS.wind]: {
        label: 'Wind',
        icon: 'wind'
    }
};

export default defineComponent({

    components: {
        WeatherActions,
        Upcoming,
        Observations,
        HourlyTrends,
        UvIndex
    },
    
    setup() {
        const trend = ref(TRENDS.temperature);
        const lastUpdated = ref('');

        function getDayKey(day: any, column: string): string {
            return `${day.dt.raw}-${column}`;
        }

        function formatDate(day: any): string {
            return format.value.date(day.dt.formatted);
            // return dateFormat(day.dt.formatted, 'EEEE, d MMM', {
            //     timeZone: forecast.value.timezone.raw
            // });
        }

        function formatTime(date: Date): string {
            return format.value.time(date);
            // return dateFormat(date, 'hh:mm a', {
            //     timeZone: forecast.value.timezone.raw
            // });
        }

        useTimer(() => {
            if (state.lastUpdated) {
                lastUpdated.value = dateFormatDistanceToNow(state.lastUpdated);
            }
        }, 10000);

        watch(() => theme.value.weather, ({ colour }) => setThemeMeta(colour));

        return {
            theme,
            forecast,
            getDayKey,
            formatDate,
            formatTime,
            trend,
            trends,
            getIcon,
            getFigure,
            lastUpdated
        };
    }

});
</script>

<style lang="scss">

    .forecast-index {
        color: var(--font__colour--weather);
        background: var(--background__colour--weather);
    }

    .forecast-index__container {
        padding: var(--spacing__large) 0;
    }

    .forecast-index__summary {
        padding: var(--spacing__large);
        padding-top: 0;
    }

    .forecast-index__summary-detail {
        min-height: 25vh;
    }

    .forecast-index__summary-temp {
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

    .forecast-index__body {
        color: var(--font__colour);
        background: var(--background__colour);
        border-top-left-radius: var(--border__radius--large);
        border-top-right-radius: var(--border__radius--large);
    }

    .forecast-index__upcoming,
    .forecast-index__observations,
    .forecast-index__uv-index {
        margin-bottom: var(--spacing__x-large);
        padding-left: var(--spacing__large);
        padding-right: var(--spacing__large);
    }

    .forecast-index__trends-options {
        padding: 0 var(--spacing__large);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing__small);
    }

    .forecast-index__trends-option {
        text-align: center;
    }

</style>