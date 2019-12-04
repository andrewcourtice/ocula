<template>
    <card class="weather-week-card">
        <template #header>
            <strong>7 Day Forecast</strong>
        </template>
        <table>
            <tr v-for="day in weekOutlook" :key="day.dateTime">
                <td>
                    <i class="fas fa-cloud-sun"></i>
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

import formatDate from '../../../packages/utilities/format-date';

export default Vue.extend({

    computed: {

        weekOutlook() {
            return weatherController.outlook.week;
        }

    },

    methods: {

        formatDate(value) {
            return formatDate(new Date(value), 'eeee');
        }

    }

});
</script>