<template>
    <card class="weather-week-card">
        <template #header>
            <strong>7 Day Forecast</strong>
        </template>
        <table>
            <tr v-for="day in weekOutlook" :key="day.dateTime">
                <td>
                    <icon name="cloud-sun"></icon>
                </td>
                <td style="width: 100%">{{ formatDate(day.dateTime) }}</td>
                <td class="text--meta">{{ day.min }}</td>
                <td class="text--meta">{{ day.max }}</td>
            </tr>
        </table>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../../../controllers/weather';

import {
    dateFormat
} from '@ocula/utilities';

export default Vue.extend({

    computed: {

        weekOutlook() {
            return weatherController.outlook.week;
        }

    },

    methods: {

        formatDate(value) {
            return dateFormat(new Date(value), 'eeee');
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