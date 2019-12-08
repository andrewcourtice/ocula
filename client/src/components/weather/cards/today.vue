<template>
    <card class="weather-today-card" :style="cardStyles">
        <template #header>
            <small v-show="lastUpdated">Updated {{ lastUpdated }} ago</small>
        </template>
        <div layout="row bottom-justify">
            <div>
                <icon :name="icon" class="weather-today-card__icon"></icon>
                <h1 class="margin__top--medium">{{ observations.temperature.temperature }}</h1>
                <span>Feel like {{ observations.temperature.apparentTemperature }}</span>
            </div>
            <div class="text--right">
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
import PRECIS_ICON from '../../../constants/precis-icon';
import PRECIS_BACKGROUND from '../../../constants/precis-background';

import Vue from 'vue';

import weatherController from '../../../controllers/weather';

import {
    dateFormatDistanceToNow
} from '@ocula/utilities';

export default Vue.extend({

    data() {
        return {
            lastUpdated: null
        };
    },
    
    computed: {

        observations() {
            return weatherController.outlook.observations;
        },

        currentOutlook() {
            return weatherController.outlook.current;
        },

        cardStyles() {
            const backgroundVariable = PRECIS_BACKGROUND[this.currentOutlook.weather.precisCode] || PRECIS_BACKGROUND.fine;
            const background = `var(--background__weather--${backgroundVariable})`;
            
            return {
                background
            };
        },

        icon() {
            return PRECIS_ICON[this.currentOutlook.weather.precisCode] || PRECIS_ICON.fine;
        }

    },

    mounted() {
        setInterval(() => {
            if (weatherController.lastUpdated) {
                this.lastUpdated = dateFormatDistanceToNow(weatherController.lastUpdated);
            }
        }, 10000);
    }

});
</script>

<style lang="scss">

    .weather-today-card {
        min-height: 8rem;
        color: var(--font__colour--compliment);
        transition: background 1s var(--transition__easing-quartic-out);
    }

    .weather-today-card__icon {
        font-size: 3rem;
    }

</style>