<template>
    <div class="route forecast-index transition-theme-change" :class="theme.weather.class">
        <container class="forecast-index__container" layout="column top-stretch">
            <weather-actions></weather-actions>
            <template v-if="forecast">
                <section class="forecast-index__summary">
                    <div class="forecast-index__summary-detail" layout="row center-justify">
                        <div>
                            <div class="forecast-index__summary-temp">{{ forecast.current.temp.formatted }}</div>
                            <div class="forecast-index__summary-description">{{ forecast.current.weather.description.formatted }}</div>
                        </div>
                        <div>
                            <img :src="getFigure(forecast.current.weather.id.raw)" alt="partly cloudy">
                        </div>
                    </div>
                    <div class="forecast-index__summary-last-updated">
                        <small v-show="lastUpdated">Updated {{ lastUpdated }} ago</small>
                    </div>
                </section>
                <div class="forecast-index__body" self="size-x1">
                    <section class="forecast-index__ahead">
                        <template v-for="day in forecast.daily">
                            <div :key="getDayKey(day, 'icon')">
                                <icon :name="getIcon(day.weather.id.raw)"/>
                            </div>
                            <div :key="getDayKey(day, 'date')">{{ formatDate(day) }}</div>
                            <div :key="getDayKey(day, 'min')">{{ day.temp.min.formatted }}</div>
                            <div :key="getDayKey(day, 'max')">{{ day.temp.max.formatted }}</div>
                        </template>
                    </section>
                    <section class="forecast-index__observations">
                        <div class="forecast-index__observation-icon">
                            <icon name="thermometer"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Temp Min</strong>
                            <div>{{ forecast.today.temp.min.formatted }}</div>
                        </div>
                        <div class="forecast-index__observation-icon">
                            <icon name="thermometer"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Temp Max</strong>
                            <div>{{ forecast.today.temp.max.formatted }}</div>
                        </div>

                        <div class="forecast-index__observation-icon">
                            <icon name="umbrella"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Precipitation</strong>
                            <div v-if="forecast.today.pop.raw > 0">{{ forecast.today.pop.formatted }} chance of rain</div>
                            <div v-else>n/a</div>
                        </div>
                        <div class="forecast-index__observation-icon">
                            <icon name="droplet"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Humidity</strong>
                            <div>{{ forecast.current.humidity.formatted }}</div>
                        </div>

                        <div class="forecast-index__observation-icon">
                            <icon name="sunrise"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Sunrise</strong>
                            <div>{{ formatTime(forecast.today.sunrise.formatted) }}</div>
                        </div>
                        <div class="forecast-index__observation-icon">
                            <icon name="sunset"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Sunset</strong>
                            <div>{{ formatTime(forecast.today.sunset.formatted) }}</div>
                        </div>

                        <div class="forecast-index__observation-icon">
                            <icon name="wind"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Wind Speed</strong>
                            <div>{{ forecast.current.windSpeed.formatted }}</div>
                        </div>
                        <div class="forecast-index__observation-icon">
                            <icon name="compass"/>
                        </div>
                        <div class="forecast-index__observation-details">
                            <strong>Wind Direction</strong>
                            <div>{{ forecast.current.windDeg.formatted }}</div>
                        </div>
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
                        <trend-chart :type="trend" :data="forecast.hourly"></trend-chart>
                    </section>
                </div>
            </template>
        </container>
    </div>
</template>

<script lang="ts">
import TRENDS from '../../constants/trends';

import WeatherActions from '../../components/weather/actions.vue';
import TrendChart from '../../components/weather/trend-chart.vue';
import UvIndex from '../../components/weather/uv-index.vue';

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
    forecast
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
        TrendChart,
        UvIndex
    },
    
    setup() {
        const trend = ref(TRENDS.temperature);
        const lastUpdated = ref('');

        function getDayKey(day: any, column: string): string {
            return `${day.dt.raw}-${column}`;
        }

        function formatDate(day: any): string {
            return dateFormat(day.dt.formatted, 'EEEE, d MMM');
        }

        function formatTime(date: Date): string {
            return dateFormat(date, 'hh:mm a');
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
        min-height: 100%;
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
        padding: var(--spacing__large) 0;
        color: var(--font__colour);
        background: var(--background__colour);
        border-top-left-radius: var(--border__radius--large);
        border-top-right-radius: var(--border__radius--large);
    }

    .forecast-index__ahead,
    .forecast-index__observations,
    .forecast-index__uv-index {
        margin-bottom: var(--spacing__x-large);
        padding-left: var(--spacing__large);
        padding-right: var(--spacing__large);
    }

    .forecast-index__ahead,
    .forecast-index__observations {
        display: grid;
        gap: var(--spacing__small);
        align-items: center;
    }

    .forecast-index__ahead {
        grid-template-columns: max-content auto max-content max-content;
    }

    .forecast-index__observations {
        grid-template-columns: max-content 1fr max-content 1fr;
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