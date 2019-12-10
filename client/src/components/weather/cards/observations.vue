<template>
    <card class="weather-observations-card" layout="columns top-stretch" v-if="today">
        <template #header>
            <strong>Observations</strong>
        </template>
        <div layout="rows top-center">
            <div v-for="observation in observations" 
                class="margin__bottom--small" 
                layout="row center-left"
                self="size-1of2"
                :key="observation.label">
                <icon :name="observation.icon"></icon>
                <div class="margin__left--small">
                    <small class="text--truncate">
                        <strong>{{ observation.label }}</strong>
                    </small>
                    <div>{{ observation.value }}</div>
                </div>
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../../../controllers/weather';

export default Vue.extend({
    
    computed: {

        today() {
            return weatherController.today;
        },

        observations() {
            return [
                {
                    label: 'Chance of rain',
                    icon: 'tint',
                    value: `${this.today.rainfall.probability}%`
                },
                {
                    label: 'Rain today',
                    icon: 'cloud-rain',
                    value: `${this.today.rainfall.today}mm`
                },
                {
                    label: 'Min temp',
                    icon: 'temperature-low',
                    value: this.today.temperature.min
                },
                {
                    label: 'Max temp',
                    icon: 'temperature-high',
                    value: this.today.temperature.max
                },
                {
                    label: 'Wind Speed',
                    icon: 'wind',
                    value: `${this.today.wind.speed}km/h`
                },
                {
                    label: 'Wind Direction',
                    icon: 'compass',
                    value: this.today.wind.direction
                },
                {
                    label: 'Humidity',
                    icon: 'water',
                    value: `${this.today.humidity}%`
                },
                {
                    label: 'Pressure',
                    icon: 'ruler-vertical',
                    value: `${this.today.pressure}kPa`
                }
            ];
        }

    }

});
</script>

<style lang="scss">

    .weather-observations-card {

        & .card__body {
            padding-bottom: 0;
        }
    }

</style>