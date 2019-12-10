<template>
    <div class="weather-forecast" v-if="forecast">
        <card class="weather-forecast-card" v-for="day in forecast" :key="day.date">
            <template #header>
                <strong>{{ day.date }}</strong>
            </template>
            <div layout="row center-left">
                <icon :name="day.icon" class="weather-forecast-card__icon"></icon>
                <div class="padding__left--small">
                    <div>{{ day.summary }}</div>
                    <small>{{ day.min }} - {{ day.max }}</small>
                </div>
            </div>
            <div class="margin__top--small" v-for="description in day.descriptions" :key="description">{{ description }}</div>
        </card>
    </div>
</template>

<script lang="ts">
import TRENDS from '../../constants/trends';
import PRECIS_ICON from '../../constants/precis-icon';

import Vue from 'vue';

import weatherController from '../../controllers/weather';

import refreshable from './_base/refreshable';

import {
    dateFormat
} from '@ocula/utilities';

export default Vue.extend({

    extends: refreshable(),

    computed: {

        forecast() {
            const forecast = weatherController.forecast;

            if (!forecast) {
                return;
            }

            return forecast.map(({ dateTime, temperature, precis }) => {
                const {
                    min,
                    max
                } = temperature;

                const {
                    code,
                    summary,
                    descriptions
                } = precis;

                const date = dateFormat(new Date(dateTime), 'eeee, eo MMM');
                const icon = PRECIS_ICON[precis.code];

                return {
                    icon,
                    date,
                    min,
                    max,
                    summary,
                    descriptions
                };
            });
        }

    },

    methods: {

        async load(locationId: number) {    
            await weatherController.loadForecast(locationId);
        }

    }

});
</script>

<style lang="scss">

    .weather-forecast-card {
        
        &:not(:last-child) {
            margin-bottom: var(--spacing__small);
        }
    }

    .weather-forecast-card__icon {
        font-size: 2em;
    }

</style>