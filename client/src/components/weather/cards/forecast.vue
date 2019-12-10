<template>
    <card class="weather-week-card" v-if="forecast">
        <template #header>
            <strong>7 Day Forecast</strong>
        </template>
        <table>
            <tr v-for="day in forecast" :key="day.label">
                <td class="text--centre">
                    <icon :name="day.icon"></icon>
                </td>
                <td style="width: 100%">{{ day.label }}</td>
                <td class="text--meta">{{ day.min }}</td>
                <td class="text--meta">{{ day.max }}</td>
            </tr>
        </table>
    </card>
</template>

<script lang="ts">
import PRECIS_ICON from '../../../constants/precis-icon';

import Vue from 'vue';

import weatherController from '../../../controllers/weather';

import {
    dateFormat
} from '@ocula/utilities';

export default Vue.extend({

    computed: {

        forecast() {
            const forecast = weatherController.forecast;

            if (!forecast) {
                return;
            }

            return forecast.map(day => {
                const icon = PRECIS_ICON[day.precis.code];
                const label = dateFormat(new Date(day.dateTime), 'eeee');

                const {
                    min,
                    max
                } = day.temperature;

                return {
                    icon,
                    label,
                    min,
                    max
                };
            });
        }

    }

});
</script>

<style lang="scss">

    .weather-week-card {

        & .card__body {
            padding: 0;
            padding-bottom: var(--spacing__x-small);
        }
    }

</style>