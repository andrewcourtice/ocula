<template>
    <card class="weather-today-card" :style="cardStyles" v-if="today">
        <div layout="row bottom-justify">
            <div>
                <icon :name="icon" class="weather-today-card__icon"></icon>
                <h1 class="margin__top--medium">{{ temperature.current }}</h1>
                <span>Feel like {{ temperature.apparent }}</span>
            </div>
            <div class="text--right">
                <div>{{ temperature.min }} - {{ temperature.max }}</div>
                <div>{{ precis.summary }}</div>
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
    
    computed: {

        today() {
            return weatherController.today;
        },

        precis() {
            return this.today.precis;
        },

        temperature() {
            return this.today.temperature;
        },

        cardStyles() {
            const backgroundVariable = PRECIS_BACKGROUND[this.precis.code] || PRECIS_BACKGROUND.fine;
            const background = `var(--background__weather--${backgroundVariable})`;
            
            return {
                background
            };
        },

        icon() {
            return PRECIS_ICON[this.precis.code] || PRECIS_ICON.fine;
        }

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