<template>
    <card class="weather-today-card">
        <template #header>
            <small>Updated {{ lastUpdated }} ago</small>
        </template>
        <div layout="row bottom-justify">
            <div>
                <icon name="cloud-sun" class="weather-today-card__icon"></icon>
                <h1 class="margin__top--medium">{{ observations.temperature.temperature }}</h1>
                <span>Feel like {{ observations.temperature.apparentTemperature }}</span>
            </div>
            <div>
                <div>{{ currentOutlook.weather.min }} - {{ currentOutlook.weather.max }}</div>
                <div>{{ currentOutlook.weather.precis }}</div>
            </div>
        </div>
        <div layout="row center-left">
            <div class="margin__left--small">
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../../../controllers/weather';

import {
    dateFormatDistanceToNow
} from '@ocula/utilities';

export default Vue.extend({
    
    computed: {

        lastUpdated() {
            if (weatherController.lastUpdated) {
                return dateFormatDistanceToNow(weatherController.lastUpdated);
            }
        },

        observations() {
            return weatherController.outlook.observations;
        },

        currentOutlook() {
            return weatherController.outlook.current;
        }

    }

});
</script>

<style lang="scss">

    .weather-today-card {
        min-height: 8rem;
        color: var(--font__colour--compliment);
        background: linear-gradient(to top right, #47B1FA 30%, #78D0F5, #ffe7ab);
    }

    .weather-today-card__icon {
        font-size: 3rem;
    }

</style>