<template>
    <accordion class="forecast-daily">
        <template #default="accordion">
            <table class="forecast-daily__days">
                <tbody class="forecast-daily__day" v-for="day in days" :key="day.dt.raw">
                    <tr class="forecast-daily__day-header menu-item" @click="accordion.toggle(day.dt.raw)">
                        <td class="forecast-daily__day-column forecast-daily__day-column--icon">
                            <icon :name="getIcon(day.weather.id.raw)"/>
                        </td>
                        <td class="forecast-daily__day-column forecast-daily__day-column--label">
                            <div>{{ getDate(day) }}</div>
                            <div class="text--meta text--tight">
                                <small>{{ day.weather.description.formatted }}</small>
                            </div>
                        </td>
                        <td class="forecast-daily__day-column forecast-daily__day-column--precip">
                            <div layout="row center-right" v-if="day.pop.raw > 0">
                                <div class="text--meta">{{ day.pop.formatted }}</div>
                                <icon name="droplet" class="forecast-daily__precip-icon" :style="getPrecipIconStyle(day)"/>
                            </div>
                        </td>
                        <td class="forecast-daily__day-column forecast-daily__day-column--min">{{ getMinMax(day.temp.min) }}</td>
                        <td class="forecast-daily__day-column forecast-daily__day-column--max">{{ getMinMax(day.temp.max) }}</td>
                    </tr>
                    <tr class="forecast-daily__day-body">
                        <td></td>
                        <td colspan="4">
                            <accordion-pane :id="day.dt.raw">
                                <div class="forecast-daily__day-details" grid="2 md-3">
                                    <observation class="forecast-daily__day-observation" label="Temp Min" icon="thermometer">{{ day.temp.min.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Temp Max" icon="thermometer">{{ day.temp.max.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Wind Speed" icon="wind">{{ day.windSpeed.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Wind Direction" icon="compass">{{ day.windDeg.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Humidity" icon="droplet">{{ day.humidity.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Cloud Coverage" icon="cloud">{{ day.clouds.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="UV Index" icon="sun">{{ day.uvi.formatted }}</observation>
                                </div>
                            </accordion-pane>
                        </td>
                    </tr>
                </tbody>

            </table>
        </template>
    </accordion>
</template>

<script lang="ts">
import Observation from '../weather/observation.vue';

import getIcon from '../../helpers/get-icon';

import {
    defineComponent,
    computed
} from 'vue';

import {
    forecast,
    format
} from '../../store';

import {
    Formatted,
    IMappedForecastDay
} from '../../interfaces/state';

export default defineComponent({

    components: {
        Observation
    },
    
    setup() {
        const days = computed(() => forecast.value.daily);

        function getDate(day: Formatted<IMappedForecastDay>) {
            return format.value.date(day.dt.formatted as any);
        }

        function getPrecipIconStyle(day: Formatted<IMappedForecastDay>) {
            return {
                opacity: Math.max(day.pop.raw, 0.3)
            };
        }

        function getMinMax(value) {
            return Math.round(value.raw);
        }

        return {
            days,
            getIcon,
            getDate,
            getPrecipIconStyle,
            getMinMax
        };
    }

});
</script>

<style lang="scss">

    .forecast-daily {

    }

    .forecast-daily__days {
        width: 100%;
        max-width: 100%;
        margin: calc(var(--spacing__x-small) * -1);

        & tr {

            & td:first-of-type {
                border-top-left-radius: var(--border__radius);
                border-bottom-left-radius: var(--border__radius);
            }

            & td:last-of-type {
                border-top-right-radius: var(--border__radius);
                border-bottom-right-radius: var(--border__radius);
            }
        }
    }

    .forecast-daily__precip-icon {
        display: block;
        width: 1em;
        height: 1em;
        margin-left: var(--spacing__xx-small);
        stroke: var(--colour__primary);
        fill: var(--colour__primary);
    }

    .forecast-daily__day-column {
        padding: var(--spacing__x-small);
        text-align: center;
        vertical-align: middle;
    }

    .forecast-daily__day-column--label {
        width: 100%;
        text-align: left;
    }

    .forecast-daily__day-column--precip {
        text-align: right;
    }

    .forecast-daily__day-column--min {
        color: var(--font__colour--meta);
    }

    .forecast-daily__day-body {

        & td {
            padding: 0;
        }

        & .accordion-pane {
            width: 100%;
            overflow: hidden;
        }       
    }

    .forecast-daily__day-details {
        padding: var(--spacing__x-small);
        padding-bottom: var(--spacing__large);
    }

    .forecast-daily__day-observation {
        padding: var(--spacing__x-small) var(--spacing__small);
        font-size: var(--font__size--small);
        background: var(--background__colour--hover);
        border-radius: var(--border__radius);
    }

</style>