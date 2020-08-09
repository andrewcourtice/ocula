<template>
    <div class="weather-forecast-route" v-if="location && data">
        <header class="weather-forecast-route__header">
            <h1 class="weather-forecast-route__temperature">{{ data.formatted.current.temp }}</h1>
            <div class="margin__top--small" layout="row center-left">
                <icon :name="data.formatted.current.icon"/><span class="margin__left--small">{{ data.formatted.current.summary }}</span>
            </div>
        </header>
        <block title="Coming Up" class="weather-forecast-route__section weather-forecast-route__section--daily">
            <div class="weather-forecast-route__days">
                <template class="weather-forecast-route__day" v-for="(day, index) in data.formatted.daily">
                    <div class="weather-forecast-route__day-icon" :key="getTemplateKey(data.raw.daily[index].dt, 'icon')">
                        <icon :name="day.icon"/>
                    </div>
                    <div class="weather-forecast-route__day-label text--truncate" :key="getTemplateKey(data.raw.daily[index].dt, 'label')">
                        <span>{{ formatDay(day.dt) }}</span>
                        <br>
                        <small class="text--meta">{{ day.summary }}</small>
                    </div>
                    <div class="weather-forecast-route__day-min" :key="getTemplateKey(data.raw.daily[index].dt, 'min')">{{ Math.round(data.raw.daily[index].temp.min) }}</div>
                    <div class="weather-forecast-route__day-max" :key="getTemplateKey(data.raw.daily[index].dt, 'max')">{{ Math.round(data.raw.daily[index].temp.max) }}</div>
                </template>
            </div>
        </block>
        <!-- <block title="Observations" class="weather-forecast-route__section" v-if="today">
            <div class="margin__bottom--small">{{ today.formatted.summary }}</div>
            <div class="weather-forecast-route__observations">
                <div class="weather-forecast-route__observation-icon">
                    <icon name="thermometer"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Temp Min</strong>
                    <div>{{ today.formatted.temperatureMin }}</div>
                </div>
                <div class="weather-forecast-route__observation-icon">
                    <icon name="thermometer"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Temp Max</strong>
                    <div>{{ today.formatted.temperatureMax }}</div>
                </div>

                <div class="weather-forecast-route__observation-icon">
                    <icon name="umbrella"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Precipitation</strong>
                    <div v-if="current.raw.precipProbability > 0">{{ current.formatted.precipProbability }} chance of {{ current.formatted.precipType }}</div>
                    <div v-else>n/a</div>
                </div>
                <div class="weather-forecast-route__observation-icon">
                    <icon name="droplet"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Humidity</strong>
                    <div>{{ current.formatted.humidity }}</div>
                </div>

                <div class="weather-forecast-route__observation-icon">
                    <icon name="sunrise"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Sunrise</strong>
                    <div>{{ formatTime(today.formatted.sunriseTime) }}</div>
                </div>
                <div class="weather-forecast-route__observation-icon">
                    <icon name="sunset"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Sunset</strong>
                    <div>{{ formatTime(today.formatted.sunsetTime) }}</div>
                </div>

                <div class="weather-forecast-route__observation-icon">
                    <icon name="wind"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Wind Speed</strong>
                    <div>{{ current.formatted.windSpeed }}</div>
                </div>
                <div class="weather-forecast-route__observation-icon">
                    <icon name="compass"/>
                </div>
                <div class="weather-forecast-route__observation-details">
                    <strong>Wind Direction</strong>
                    <div>{{ current.formatted.windBearing }}</div>
                </div>
            </div>
        </block> -->
        <!-- <block title="Trends" class="weather-forecast-route__section weather-forecast-route__section--trends" v-if="hourly">
            <div class="weather-forecast-route__trend-options" layout="rows center-spread">
                <div class="weather-forecast-route__trend-option"
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
        </block> -->
        <block title="Radar" class="weather-forecast-route__section weather-forecast-route__section--radar">
            <router-link to="/weather/radar">
                <radar class="weather-forecast-route__radar"
                    :latitude="location.latitude" 
                    :longitude="location.longitude"
                    :timestamps="data.raw.radar.timestamps">
                </radar>
            </router-link>
        </block>
        <footer class="weather-forecast-route__footer text--centre">
            <img class="weather-forecast-route__attribution" src="https://darksky.net/dev/img/attribution/poweredby.png" alt="Powered by Dark Sky">
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

        data() {
            return weatherController.data || {
                raw: {},
                formatted: {}
            };
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
                'weather-forecast-route__trend-option--active': type === this.trendType
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

    .weather-forecast-route__header {
        margin-bottom: var(--spacing__large);
    }

    .weather-forecast-route__footer {
        margin-top: var(--spacing__large);
    }

    .weather-forecast-route__temperature {
        font-size: 3.25rem;
    }

    .weather-forecast-route__days,
    .weather-forecast-route__observations {
        display: grid;
        grid-gap: var(--spacing__small);
        align-items: center;
    }

    .weather-forecast-route__observations {
        grid-template-columns: auto 1fr auto 1fr;
    }

    .weather-forecast-route__days {
        grid-template-columns: auto 1fr auto auto;
    }

    .weather-forecast-route__day-min,
    .weather-forecast-route__day-max {
        text-align: center;
        opacity: 0.5;
    }

    .weather-forecast-route__day-min {
        color: dodgerblue;
    }

    .weather-forecast-route__day-max {
        color: red;
    }

    .weather-forecast-route__trend-option {
        color: var(--font__colour--meta);
    }

    .weather-forecast-route__trend-option--active {
        color: inherit;
    }

    .weather-forecast-route__attribution {
        display: inline-block;
        width: 100%;
        max-width: 128px;
    }

</style>