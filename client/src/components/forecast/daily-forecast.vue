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
                                <icon name="drop-fill" class="forecast-daily__precip-icon" :style="getPrecipIconStyle(day)"/>
                            </div>
                        </td>
                        <td class="forecast-daily__day-column forecast-daily__day-column--min">{{ getMinMax(day.temp.min) }}</td>
                        <td class="forecast-daily__day-column forecast-daily__day-column--max">{{ getMinMax(day.temp.max) }}</td>
                    </tr>
                    <tr class="forecast-daily__day-body">
                        <td colspan="5">
                            <accordion-pane :id="day.dt.raw">
                                <div class="forecast-daily__day-details" grid="2 md-3">
                                    <observation class="forecast-daily__day-observation" label="Temp Min" icon="temp-cold-line">{{ day.temp.min.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Temp Max" icon="temp-hot-line">{{ day.temp.max.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Wind Speed" icon="windy-line">{{ day.windSpeed.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Wind Direction" icon="compass-3-line">{{ day.windDeg.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Humidity" icon="contrast-drop-2-line">{{ day.humidity.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Pressure" icon="swap-line">{{ day.pressure.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="Cloud Coverage" icon="cloudy-line">{{ day.clouds.formatted }}</observation>
                                    <observation class="forecast-daily__day-observation" label="UV Index" icon="sun-line">
                                        <div layout="row center-left">
                                            <div class="margin__right--x-small">{{ day.uvi.formatted }}</div>
                                            <div class="dot" :style="getUvIndexDotStyle(day.uvi.raw)"></div>
                                        </div>
                                    </observation>
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
import UV_INDEX from '../../constants/forecast/uv-index';

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
    scaleContinuous
} from '@ocula/utilities';

import type {
    Formatted,
    IMappedForecastDay
} from '../../types/state';

export default defineComponent({

    components: {
        Observation
    },
    
    setup() {
        const precipScale = scaleContinuous([0, 1], [0.5, 1]);
        const days = computed(() => forecast.value.daily);

        function getDate(day: Formatted<IMappedForecastDay>) {
            return format.value.date(day.dt.formatted as any);
        }

        function getPrecipIconStyle(day: Formatted<IMappedForecastDay>) {
            return {
                opacity: precipScale(day.pop.raw, true)
            };
        }

        function getMinMax(value) {
            return Math.round(value.raw);
        }

        function getUvIndexDotStyle(uvIndex: number) {
            const {
                colour
            } = UV_INDEX.slice()
                .reverse()
                .find(({ start }) => uvIndex >= start);

            return {
                backgroundColor: colour
            };
        }

        return {
            days,
            getIcon,
            getDate,
            getPrecipIconStyle,
            getMinMax,
            getUvIndexDotStyle
        };
    }

});
</script>

<style lang="scss">

    .forecast-daily {

    }

    .forecast-daily__days {
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
        padding: var(--spacing__small) var(--spacing__x-small) var(--spacing__large);
    }

    .forecast-daily__day-observation {
        font-size: var(--font__size--small);
    }

</style>