<template>
    <div class="weather-forecast">
        <header class="weather-forecast__header" v-if="current">
            <h1 class="weather-forecast__temperature">{{ current.temperature }}&deg;C</h1>
            <div class="margin__top--small" layout="row center-left">
                <icon :name="current.icon"/><span class="margin__left--small">{{ current.summary }}</span>
            </div>
        </header>
        <section class="weather-forecast__section weather-forecast__section--daily" v-if="daily">
            <h2 class="weather-forecast__section-title">Coming Up</h2>
            <table class="weather-forecast__days">
                <tr class="weather-forecast__day" v-for="day in daily" :key="day.time">
                    <td class="weather-forecast__day-icon">
                        <icon :name="day.icon"/>
                    </td>
                    <td class="weather-forecast__day-label text--truncate">{{ formatDay(day.time) }}</td>
                    <td class="weather-forecast__day-rain">
                        <small>
                            <icon name="umbrella" v-show="day.precipProbability > 0.25"/>
                        </small>
                    </td>
                    <td class="weather-forecast__day-min">{{ day.temperatureMin }}</td>
                    <td class="weather-forecast__day-max">{{ day.temperatureMax }}</td>
                </tr>
            </table>
        </section>
        <section class="weather-forecast__section">
            <h2 class="weather-forecast__section-title">Observations</h2>
            <p>{{ today.summary }}</p>
            <table class="weather-forecast__observations">
                <tr>
                    <td class="weather-forecast__observation-icon">
                        <icon name="thermometer"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Temp Min</strong>
                        <div>{{ today.temperatureMin }}&deg;C</div>
                    </td>
                    <td class="weather-forecast__observation-icon">
                        <icon name="thermometer"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Temp Max</strong>
                        <div>{{ today.temperatureMax }}&deg;C</div>
                    </td>
                </tr>
                <tr>
                    <td class="weather-forecast__observation-icon">
                        <icon name="umbrella"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Precipitation</strong>
                        <div>{{ getPrecipitationSummary(today.precipProbability, today.precipType) }}</div>
                    </td>
                    <td class="weather-forecast__observation-icon">
                        <icon name="droplet"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Humidity</strong>
                        <div>{{ formatPercentage(today.humidity) }}</div>
                    </td>
                </tr>
                <tr>
                    <td class="weather-forecast__observation-icon">
                        <icon name="sunrise"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Sunrise</strong>
                        <div>{{ formatTime(today.sunriseTime) }}</div>
                    </td>
                    <td class="weather-forecast__observation-icon">
                        <icon name="sunset"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Sunset</strong>
                        <div>{{ formatTime(today.sunsetTime) }}</div>
                    </td>
                </tr>
            </table>
        </section>
        <section class="weather-forecast__section weather-forecast__section--trends" v-if="hourly">
            <h2 class="weather-forecast__section-title">Trends</h2>
            <table class="weather-forecast__trends">
                <tr>
                    <td>
                        <strong>Temperature</strong>
                    </td>
                    <td>
                        <strong>Precipitation</strong>
                    </td>
                </tr>
                <tr>
                    <td>
                        <sparkline-chart :data="hourly" :options="trendsOptions.temperature" ref="trends"/>
                    </td>
                    <td>
                        <sparkline-chart :data="hourly" :options="trendsOptions.precipitation" ref="trends"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>UV Index</strong>
                    </td>
                    <td>
                        <strong>Wind Speed</strong>
                    </td>
                </tr>
                <tr>
                    <td>
                        <sparkline-chart :data="hourly" :options="trendsOptions.uvIndex" ref="trends"/>
                    </td>
                    <td>
                        <sparkline-chart :data="hourly" :options="trendsOptions.windSpeed" ref="trends"/>
                    </td>
                </tr>
            </table>
        </section>
        <section class="weather-forecast__section weather-forecast__section--radar" v-if="location && radar">
            <h2 class="weather-forecast__section-title">Radar</h2>
            <router-link to="/weather/radar">
                <radar class="weather-forecast__radar"
                    :latitude="location.latitude" 
                    :longitude="location.longitude"
                    :timestamps="radar.timestamps"
                    carousel-enabled>
                </radar>
            </router-link>
        </section>
        <footer class="weather-forecast__footer text--centre">
            <img class="weather-forecast__attribution" src="https://darksky.net/dev/img/attribution/poweredby.png" alt="Powered by Dark Sky">
            <p v-if="lastUpdated">
                <small class="text--meta">Updated {{ lastUpdated }} ago</small>
            </p>
        </footer>
    </div>
</template>

<script lang="ts">
import ICON from '../../constants/icon';

import Vue from 'vue';

import Radar from '../../components/weather/core/radar.vue';
import SparklineChart from '../../components/core/charts/sparkline.vue';

import refreshable from './_base/refreshable';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

import {
    dateFormat,
    dateFromUnix
} from '@ocula/utilities';

export default Vue.extend({

    extends: refreshable,

    data() {
        return {
            trendsOptions: {
                temperature: {
                    xSelector: hour => hour.time,
                    ySelector: hour => hour.temperature,
                    colours: {
                        line: '#FF9900'
                    }
                },
                precipitation: {
                    xSelector: hour => hour.time,
                    ySelector: hour => hour.precipProbability,
                    colours: {
                        line: '#47B1FA'
                    }
                },
                uvIndex: {
                    xSelector: hour => hour.time,
                    ySelector: hour => hour.uvIndex,
                    colours: {
                        line: '#FF9900'
                    }
                },
                windSpeed: {
                    xSelector: hour => hour.time,
                    ySelector: hour => hour.windSpeed,
                    colours: {
                        line: '#47B1FA'
                    }
                }
            }
        }
    },

    computed: {

        location() {
            return weatherController.location
        },

        current() {
            return weatherController.current;
        },

        daily() {
            return weatherController.daily;
        },

        today() {
            if (!this.daily) {
                return;
            }

            return this.daily[0];
        },

        hourly() {
            return weatherController.hourly;
        },

        radar() {
            return weatherController.radar;
        }

    },

    methods: {

        formatDay(date) {
            return dateFormat(date, 'EEEE, d MMM');
        },

        formatTime(date) {
            return dateFormat(date, 'h:mm a');
        },

        formatPercentage(value) {
            return `${Math.round(value * 100)}%`;
        },

        getPrecipitationSummary(probability, type) {
            return `${this.formatPercentage(probability)} chance of ${type}`;
        }

    },

    components: {
        Radar,
        SparklineChart
    }

});
</script>

<style lang="scss">

    .weather-forecast__section,
    .weather-forecast__footer {
        margin-top: var(--spacing__large);
    }

    .weather-forecast__section-title {
        margin-bottom: var(--spacing__small);
        color: var(--font__colour--meta);
        font-size: var(--font__size);
        font-weight: var(--font__weight--medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .weather-forecast__temperature {
        font-size: 3.25rem;
    }

    .weather-forecast__days,
    .weather-forecast__observations,
    .weather-forecast__trends {
        width: 100%;

        & tr {

            & td:first-child {
                padding-left: 0;
            }

            & td:last-child {
                padding-right: 0;
            }
        }
    }

    .weather-forecast__day-label {
        width: 100%;
    }

    .weather-forecast__day-rain {
        color: #47B1FA;
    }

    .weather-forecast__day-min,
    .weather-forecast__day-max {
        text-align: center;
        color: var(--font__colour--meta);
    }

    .weather-forecast__observation-details {
        width: 50%;
    }

    .weather-forecast__attribution {
        display: inline-block;
        width: 100%;
        max-width: 128px;
    }

</style>