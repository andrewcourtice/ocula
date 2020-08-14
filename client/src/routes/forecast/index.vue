<template>
    <div class="route forecast-index" :class="theme.weather.class" v-meta:theme-color="theme.weather.colour">
        <container class="forecast-index__container" layout="column top-stretch">
            <weather-actions></weather-actions>
            <template v-if="forecast">
                <section class="forecast-index__summary" layout="row center-justify">
                    <div>
                        <div class="forecast-index__summary-temp">{{ forecast.current.temp.formatted }}</div>
                        <div class="forecast-index__summary-description">{{ forecast.current.weather.description.formatted }}</div>
                    </div>
                    <div>
                        <img :src="getFigure(forecast.current.weather.id.raw)" alt="partly cloudy">
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
                    <section class="forecast-index__trends">
                        <trend-chart :type="trendType" :data="forecast.hourly"></trend-chart>
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

import getIcon from '../../helpers/get-icon';
import getFigure from '../../helpers/get-figure';

import {
    defineComponent
} from 'vue';

import {
    theme,
    forecast
} from '../../store';

import {
    dateFormat
} from '@ocula/utilities';

export default defineComponent({

    components: {
        WeatherActions,
        TrendChart
    },
    
    setup() {
        const trendType = TRENDS.temperature;

        function getDayKey(day: any, column: string): string {
            return `${day.dt.raw}-${column}`;
        }

        function formatDate(day: any): string {
            return dateFormat(day.dt.formatted, 'EEEE, d MMM');
        }

        function formatTime(date: Date): string {
            return dateFormat(date, 'hh:mm a');
        }

        return {
            theme,
            forecast,
            getDayKey,
            formatDate,
            formatTime,
            trendType,
            getIcon,
            getFigure
        };
    }

});
</script>

<style lang="scss">

    .forecast-index {
        color: var(--font__colour--weather);
        background: var(--background__colour--weather);
        transition: color var(--transition__timing--fade) var(--transition__easing--default),
                    background var(--transition__timing--fade) var(--transition__easing--default);
    }

    .forecast-index__container {
        min-height: 100%;
    }

    .forecast-index__summary {
        padding: var(--spacing__large);
        padding-top: 0;
        min-height: 25vh;
    }

    .forecast-index__summary-temp {
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

    .forecast-index__body {
        padding-bottom: var(--spacing__large);
        color: var(--font__colour);
        background: var(--background__colour);
        border-top-left-radius: var(--border__radius--large);
        border-top-right-radius: var(--border__radius--large);
    }

    .forecast-index__ahead,
    .forecast-index__observations,
    .forecast-index__trends {
        margin-top: var(--spacing__large);
    }

    .forecast-index__ahead,
    .forecast-index__observations {
        display: grid;
        gap: var(--spacing__small);
        align-items: center;
        padding-left: var(--spacing__large);
        padding-right: var(--spacing__large);
    }

    .forecast-index__ahead {
        grid-template-columns: max-content auto max-content max-content;
    }

    .forecast-index__observations {
        grid-template-columns: max-content 1fr max-content 1fr;
    }

</style>