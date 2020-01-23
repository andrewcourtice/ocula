<template>
    <div class="weather-forecast">
        <header class="weather-forecast__current" v-if="current">
            <h1 class="weather-forecast__temperature">{{ Math.round(current.temperature) }}</h1>
            <div class="margin__top--small" layout="row center-left">
                <icon name="cloud-lightning"/><span class="margin__left--x-small">{{ current.summary }}</span>
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
        <section class="weather-forecast__section weather-forecast__section--radar" v-if="location && radar">
            <h2 class="weather-forecast__section-title">Radar</h2>
            <radar />
        </section>
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
            return weatherController.current;
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

    .weather-forecast__section {
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
        font-size: 3rem;
    }

    .weather-forecast__days {
        width: 100%;
    }

    .weather-forecast__day-label {
        width: 100%;
    }

    .weather-forecast__day-icon {
        padding-left: 0
    }

    .weather-forecast__day-max {
        padding-right: 0
    }

</style>