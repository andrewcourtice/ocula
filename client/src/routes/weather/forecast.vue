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
            <div class="weather-forecast__days">
                <template class="weather-forecast__day" v-for="day in daily">
                    <div class="weather-forecast__day-icon" :key="getTemplateKey(day.time, 'icon')">
                        <icon :name="day.icon"/>
                    </div>
                    <div class="weather-forecast__day-label text--truncate" :key="getTemplateKey(day.time, 'label')">
                        <span>{{ formatDay(day.time) }}</span>
                        <br>
                        <small class="text--meta">{{ day.summary }}</small>
                    </div>
                    <div class="weather-forecast__day-rain" :key="getTemplateKey(day.time, 'precip')">
                        <small>
                            <icon name="umbrella" v-show="day.precipProbability > 0.25"/>
                        </small>
                    </div>
                    <div class="weather-forecast__day-min" :key="getTemplateKey(day.time, 'min')">{{ day.temperatureMin }}</div>
                    <div class="weather-forecast__day-max" :key="getTemplateKey(day.time, 'max')">{{ day.temperatureMax }}</div>
                </template>
            </div>
        </section>
        <section class="weather-forecast__section">
            <h2 class="weather-forecast__section-title">Observations</h2>
            <p>{{ today.summary }}</p>
            <div class="weather-forecast__observations">
                <div class="weather-forecast__observation-icon">
                    <icon name="thermometer"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Temp Min</strong>
                    <div>{{ today.temperatureMin }}&deg;C</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="thermometer"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Temp Max</strong>
                    <div>{{ today.temperatureMax }}&deg;C</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="umbrella"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Precipitation</strong>
                    <div>{{ getPrecipitationSummary(today.precipProbability, today.precipType) }}</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="droplet"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Humidity</strong>
                    <div>{{ formatPercentage(today.humidity) }}</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="sunrise"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Sunrise</strong>
                    <div>{{ formatTime(today.sunriseTime) }}</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="sunset"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Sunset</strong>
                    <div>{{ formatTime(today.sunsetTime) }}</div>
                </div>
            </div>
        </section>
        <section class="weather-forecast__section weather-forecast__section--trends" v-if="hourly">
            <h2 class="weather-forecast__section-title">Trends</h2>
            <div class="weather-forecast__trends">
                <strong>Temperature</strong>
                <strong>Precipitation</strong>
                <sparkline-chart :data="hourly" :options="trendsOptions.temperature"/>
                <sparkline-chart :data="hourly" :options="trendsOptions.precipitation"/>
                <strong>UV Index</strong>
                <strong>Wind Speed</strong>
                <sparkline-chart :data="hourly" :options="trendsOptions.uvIndex"/>
                <sparkline-chart :data="hourly" :options="trendsOptions.windSpeed"/>
            </div>
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

        getTemplateKey(id, area) {
            return `${id}-${area}`;
        },

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
        display: grid;
        grid-gap: var(--spacing__small);
        align-items: center;
    }

    .weather-forecast__observations {
        grid-template-columns: auto 1fr auto 1fr;
    }

    .weather-forecast__days {
        grid-template-columns: auto 1fr auto auto auto;
    }

    .weather-forecast__trends {
        grid-template-columns: 1fr 1fr;
    }

    .weather-forecast__day-rain {
        color: #47B1FA;
    }

    .weather-forecast__day-min,
    .weather-forecast__day-max {
        text-align: center;
        color: var(--font__colour--meta);
    }

    .weather-forecast__attribution {
        display: inline-block;
        width: 100%;
        max-width: 128px;
    }

</style>