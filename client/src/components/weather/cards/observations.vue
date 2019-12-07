<template>
    <card class="weather-observations-card" layout="columns top-stretch">
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

        observations() {
            const {
                observations,
                current
            } = weatherController.outlook;

            return [
                {
                    label: 'Chance of rain',
                    icon: 'tint',
                    value: `${current.rainfall.probability}%`
                },
                {
                    label: 'Rain today',
                    icon: 'cloud-rain',
                    value: `${observations.rainfall.todayAmount}mm`
                },
                {
                    label: 'Min temp',
                    icon: 'temperature-low',
                    value: current.weather.min
                },
                {
                    label: 'Max temp',
                    icon: 'temperature-high',
                    value: current.weather.max
                },
                {
                    label: 'Wind Speed',
                    icon: 'wind',
                    value: `${observations.wind.speed}km/h`
                },
                {
                    label: 'Wind Direction',
                    icon: 'compass',
                    value: observations.wind.directionText
                },
                {
                    label: 'Humidity',
                    icon: 'water',
                    value: `${observations.humidity.percentage}%`
                },
                {
                    label: 'Pressure',
                    icon: 'ruler-vertical',
                    value: observations.wind.directionText
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