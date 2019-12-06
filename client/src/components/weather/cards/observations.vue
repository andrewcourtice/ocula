<template>
    <card class="weather-observations-card" layout="columns top-stretch">
        <template #header>
            <strong>Observations</strong>
        </template>
        <table class="table--fixed">
            <tr v-for="(group, key) in observations" :key="key">
                <td class="text--truncate">
                    <icon class="margin__right--small" :name="group.icon"></icon><strong>{{ group.label }}</strong>
                </td>
                <td v-for="value in group.values" :key="value.label">
                    <small class="text--truncate">
                        <strong>{{ value.label }}</strong>
                    </small>
                    <div>{{ value.value }}</div>
                </td>
            </tr>
        </table>
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

            return {
                rainfall: {
                    label: 'Rainfall',
                    icon: 'tint',
                    values: [
                        {
                            label: 'Chance',
                            value: `${current.rainfall.probability}%`
                        },
                        {
                            label: 'Since 9am',
                            value: `${observations.rainfall.todayAmount}mm`
                        }
                    ]
                },
                temperature: {
                    label: 'Temperature',
                    icon: 'thermometer-half',
                    values: [
                        {
                            label: 'Min',
                            value: current.weather.min
                        },
                        {
                            label: 'Max',
                            value: current.weather.max
                        }
                    ]
                },
                wind: {
                    label: 'Wind',
                    icon: 'wind',
                    values: [
                        {
                            label: 'Speed',
                            value: `${observations.wind.speed}km/h`
                        },
                        {
                            label: 'Direction',
                            value: observations.wind.directionText
                        }
                    ]
                }
            };
        }

    }

});
</script>

<style lang="scss">

    .weather-observations-card {

        & .card__body {
            padding: 0; 
        }
    }

</style>