<template>
    <div class="weather-forecast">
        <header class="weather-forecast__header" v-if="current">
            <h1 class="weather-forecast__temperature">{{ current.temperature }}&deg;C</h1>
            <div class="margin__top--small" layout="row center-left">
                <icon :name="current.icon"/><span class="margin__left--x-small">{{ current.summary }}</span>
            </div>
        </header>
        <section class="weather-forecast__section weather-forecast__section--daily" v-if="daily">
            <h2 class="weather-forecast__section-title">Coming Up</h2>
            <table class="weather-forecast__days">
                <tr class="weather-forecast__day" v-for="day in daily" :key="day.key">
                    <td class="weather-forecast__day-icon">
                        <icon :name="day.icon"/>
                    </td>
                    <td class="weather-forecast__day-label text--truncate">{{ day.label }}</td>
                    <td class="weather-forecast__day-min">{{ day.min }}</td>
                    <td class="weather-forecast__day-max">{{ day.max }}</td>
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
                        <div>{{ today.temperatureMin }}</div>
                    </td>
                    <td class="weather-forecast__observation-icon">
                        <icon name="thermometer"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Temp Max</strong>
                        <div>{{ today.temperatureMax }}</div>
                    </td>
                </tr>
                <tr>
                    <td class="weather-forecast__observation-icon">
                        <icon name="umbrella"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Precipitation</strong>
                        <div>{{ today.precipitation }}</div>
                    </td>
                    <td class="weather-forecast__observation-icon">
                        <icon name="droplet"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Humidity</strong>
                        <div>{{ today.humidity }}</div>
                    </td>
                </tr>
                <tr>
                    <td class="weather-forecast__observation-icon">
                        <icon name="sunrise"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Sunrise</strong>
                        <div>{{ today.sunriseTime }}</div>
                    </td>
                    <td class="weather-forecast__observation-icon">
                        <icon name="sunset"/>
                    </td>
                    <td class="weather-forecast__observation-details">
                        <strong>Sunset</strong>
                        <div>{{ today.sunsetTime }}</div>
                    </td>
                </tr>
            </table>
        </section>
        <section class="weather-forecast__section weather-forecast__section--radar" v-if="location && radar">
            <h2 class="weather-forecast__section-title">Radar</h2>
            <radar />
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

import refreshable from './_base/refreshable';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

import {
    dateFormat,
    dateFromUnix
} from '@ocula/utilities';

export default Vue.extend({

    extends: refreshable,

    computed: {

        location() {
            return weatherController.location
        },

        current() {
            const current = weatherController.current;

            if (!current) {
                return;
            }

            let {
                icon,
                summary,
                temperature
            } = current;

            icon = ICON[icon];
            temperature = Math.round(temperature);

            return {
                icon,
                summary,
                temperature
            };
        },

        daily() {
            const {
                data
            } = weatherController.daily;

            return data.map(day => {
                let {
                    time,
                    icon,
                    temperatureMin,
                    temperatureMax,
                } = day;

                const date = dateFromUnix(time);
                const label = dateFormat(date, 'EEEE, d MMM');
                const min = Math.round(temperatureMin);
                const max = Math.round(temperatureMax);

                icon = ICON[icon]; 

                return {
                    icon,
                    label,
                    min,
                    max,
                    key: time
                };
            });
        },

        today() {
            const {
                data
            } = weatherController.daily;

            if (!data) {
                return;
            }

            let {
                temperatureMin,
                temperatureMax,
                humidity,
                precipProbability,
                precipType,
                pressure,
                summary,
                sunriseTime,
                sunsetTime,
                uvIndex,
                windSpeed
            } = data[0];

            temperatureMin = Math.round(temperatureMin);
            temperatureMax = Math.round(temperatureMax);
            sunriseTime = dateFormat(dateFromUnix(sunriseTime), 'h:mm a');
            sunsetTime = dateFormat(dateFromUnix(sunsetTime), 'h:mm a');

            const precipitation = `${precipProbability * 100}% chance of ${precipType}`;

            return {
                temperatureMin,
                temperatureMax,
                humidity,
                precipitation,
                pressure,
                summary,
                sunriseTime,
                sunsetTime,
                uvIndex,
                windSpeed
            };
        },

        radar() {
            return weatherController.radar;
        }

    },

    components: {
        Radar
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
    .weather-forecast__observations {
        width: 100%;
    }

    .weather-forecast__day-label {
        width: 100%;
    }

    .weather-forecast__day-icon,
    .weather-forecast__observation-icon {
        padding-left: 0
    }

    .weather-forecast__day-max {
        padding-right: 0
    }

    .weather-forecast__day-min,
    .weather-forecast__day-max {
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