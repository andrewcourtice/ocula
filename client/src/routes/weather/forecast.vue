<template>
    <div class="weather-forecast">
        <section class="weather-forecast__section" v-if="current">
            <div class="weather-forecast__section-header">Today</div>
            <card class="weather-forecast__today-card">
                <div layout="row center-left">
                    <icon class="weather-forecast__icon" name="cloud-drizzle"></icon>
                    <h1 class="weather-forecast__temperature">{{ Math.round(current.temperature) }}</h1>
                </div>
                <div class="text--meta" layout="row center-justify">
                    <div>{{ current.summary }}</div>
                    <div layout="rows center-justify">
                        <svg class="weather-forecast__icon">
                            <use xlink:href="feather-sprite.svg#cloud-drizzle"/>
                        </svg>
                    </div>
                </div>
            </card>  
        </section>
        <section class="weather-forecast__section margin__top--medium" v-if="daily">
            <div class="weather-forecast__section-header">Coming Up</div>
            <card class="weather-forecast__day-card">
                <div class="menu">
                    <div class="menu-item" layout="row center-justify" v-for="day in daily" :key="day.time">
                        <icon name="cloud-drizzle"></icon>
                        <div self="size-x1">Some day</div>
                        <div layout="row center-right">
                            <div>{{ Math.round(day.temperatureMin) }}</div>
                            <span>&nbsp;&dash;&nbsp;</span>
                            <div>{{ Math.round(day.temperatureMax) }}</div>
                        </div>
                    </div>
                </div>
            </card>  
        </section>
        <section class="weather-forecast__section margin__top--medium" v-if="hourly">
            <div class="weather-forecast__section-header">Trends</div>
            <card class="weather-forecast__day-card">
                <temperature-chart :value="hourly"></temperature-chart>
            </card>  
        </section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import TemperatureChart from '../../components/weather/charts/temperature';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

export default Vue.extend({

    computed: {

        current() {
            return weatherController.current;
        },

        daily() {
            return weatherController.daily.data;
        },

        hourly() {
            return weatherController.hourly.data;
        }

    },

    methods: {

        async load() {    
            return weatherController.load();
        }

    },

    activated() {
        this.load();
    },

    components: {
        TemperatureChart
    }

});
</script>

<style lang="scss">

    .weather-forecast__section-header {
        font-weight: var(--font__weight--medium);
        letter-spacing: 1.5px;
        text-transform: uppercase;
        margin-bottom: var(--spacing__x-small);
    }

    .weather-forecast__icon {
        width: 48px;
        height: 48px;
    }

    .weather-forecast__temperature {
        margin: 0;
        margin-left: var(--spacing__small);
        font-size: 48px;
        font-weight: 400;
        line-height: 1;
    }

</style>