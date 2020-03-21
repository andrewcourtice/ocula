<template>
    <div class="weather-forecast">
        <header class="weather-forecast__header" v-if="current">
            <h1 class="weather-forecast__temperature">{{ current.formatted.temperature }}</h1>
            <div class="margin__top--small" layout="row center-left">
                <icon :name="current.formatted.icon"/><span class="margin__left--small">{{ current.formatted.summary }}</span>
            </div>
        </header>
        <block title="Coming Up" class="weather-forecast__section weather-forecast__section--daily" v-if="daily">
            <div class="weather-forecast__days">
                <template class="weather-forecast__day" v-for="{ raw, formatted } in daily">
                    <div class="weather-forecast__day-icon" :key="getTemplateKey(raw.time, 'icon')">
                        <icon :name="formatted.icon"/>
                    </div>
                    <div class="weather-forecast__day-label text--truncate" :key="getTemplateKey(raw.time, 'label')">
                        <span>{{ formatDay(formatted.time) }}</span>
                        <br>
                        <small class="text--meta">{{ formatted.summary }}</small>
                    </div>
                    <div class="weather-forecast__day-min" :key="getTemplateKey(raw.time, 'min')">{{ Math.round(raw.temperatureMin) }}</div>
                    <div class="weather-forecast__day-max" :key="getTemplateKey(raw.time, 'max')">{{ Math.round(raw.temperatureMax) }}</div>
                </template>
            </div>
        </block>
        <block title="Observations" class="weather-forecast__section" v-if="today">
            <div class="margin__bottom--small">{{ today.formatted.summary }}</div>
            <div class="weather-forecast__observations">
                <div class="weather-forecast__observation-icon">
                    <icon name="thermometer"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Temp Min</strong>
                    <div>{{ today.formatted.temperatureMin }}</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="thermometer"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Temp Max</strong>
                    <div>{{ today.formatted.temperatureMax }}</div>
                </div>

                <div class="weather-forecast__observation-icon">
                    <icon name="umbrella"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Precipitation</strong>
                    <div v-if="current.raw.precipProbability > 0">{{ current.formatted.precipProbability }} chance of {{ current.formatted.precipType }}</div>
                    <div v-else>n/a</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="droplet"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Humidity</strong>
                    <div>{{ current.formatted.humidity }}</div>
                </div>

                <div class="weather-forecast__observation-icon">
                    <icon name="sunrise"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Sunrise</strong>
                    <div>{{ formatTime(today.formatted.sunriseTime) }}</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="sunset"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Sunset</strong>
                    <div>{{ formatTime(today.formatted.sunsetTime) }}</div>
                </div>

                <div class="weather-forecast__observation-icon">
                    <icon name="wind"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Wind Speed</strong>
                    <div>{{ current.formatted.windSpeed }}</div>
                </div>
                <div class="weather-forecast__observation-icon">
                    <icon name="compass"/>
                </div>
                <div class="weather-forecast__observation-details">
                    <strong>Wind Direction</strong>
                    <div>{{ current.formatted.windBearing }}</div>
                </div>
            </div>
        </block>
        <block title="Trends" class="weather-forecast__section weather-forecast__section--trends" v-if="hourly">
            <div class="weather-forecast__trend-options" layout="rows center-spread">
                <div class="weather-forecast__trend-option"
                    layout="rows center-center sm-column"
                    self="size-x1"
                    v-for="(value, key) in trendOptions"
                    :key="key"
                    :class="getTrendOptionClass(key)"
                    @click="trendType = key">
                    <icon :name="value.icon"/>
                    <div class="margin__left--x-small" self="sm-hide"></div>
                    <div class="text--truncate">{{ value.label }}</div>
                </div>
            </div>
            <trend-chart :type="trendType" :data="hourly"/>
        </block>
        <block title="Radar" class="weather-forecast__section weather-forecast__section--radar" v-if="location && radar">
            <router-link to="/weather/radar">
                <radar class="weather-forecast__radar"
                    :latitude="location.latitude" 
                    :longitude="location.longitude"
                    :timestamps="radar.timestamps">
                </radar>
            </router-link>
        </block>
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
import TRENDS from '../../constants/trends';

import Vue from 'vue';

import TrendChart from '../../components/weather/core/trend-chart.vue';
import Radar from '../../components/weather/core/radar.vue';

import refreshable from './_base/refreshable';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

import {
    dateFromUnix,
    dateFormat,
    objectMerge
} from '@ocula/utilities';

const TREND_OPTIONS = {
    [TRENDS.temperature]: {
        icon: 'thermometer',
        label: 'Temperature'
    },
    [TRENDS.rainfall]: {
        icon: 'umbrella',
        label: 'Rainfall'
    },
    [TRENDS.uv]: {
        icon: 'sun',
        label: 'UV Index'
    },
    [TRENDS.wind]: {
        icon: 'wind',
        label: 'Wind'
    }
};

export default Vue.extend({

    extends: refreshable,

    data() {
        return {
            trendOptions: TREND_OPTIONS,
            trendType: TRENDS.temperature
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

        getTrendOptionClass(type) {
            return {
                'weather-forecast__trend-option--active': type === this.trendType
            };
        }

    },

    components: {
        TrendChart,
        Radar
    }

});
</script>

<style lang="scss">

    .weather-forecast__header {
        margin-bottom: var(--spacing__large);
    }

    .weather-forecast__footer {
        margin-top: var(--spacing__large);
    }

    .weather-forecast__temperature {
        font-size: 3.25rem;
    }

    .weather-forecast__days,
    .weather-forecast__observations {
        display: grid;
        grid-gap: var(--spacing__small);
        align-items: center;
    }

    .weather-forecast__observations {
        grid-template-columns: auto 1fr auto 1fr;
    }

    .weather-forecast__days {
        grid-template-columns: auto 1fr auto auto;
    }

    .weather-forecast__day-min,
    .weather-forecast__day-max {
        text-align: center;
        opacity: 0.5;
    }

    .weather-forecast__day-min {
        color: dodgerblue;
    }

    .weather-forecast__day-max {
        color: red;
    }

    .weather-forecast__trend-option {
        color: var(--font__colour--meta);
    }

    .weather-forecast__trend-option--active {
        color: inherit;
    }

    .weather-forecast__attribution {
        display: inline-block;
        width: 100%;
        max-width: 128px;
    }

</style>