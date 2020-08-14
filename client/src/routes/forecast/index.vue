<template>
    <div class="route forecast-index">
        <container>
            <weather-actions></weather-actions>
            <template v-if="forecast">
                <section class="forecast-index__summary" layout="row center-justify">
                    <div>
                        <div class="forecast-index__summary-temp">{{ forecast.current.temp.formatted }}</div>
                        <div class="forecast-index__summary-description">{{ forecast.current.weather[0].description.formatted }}</div>
                    </div>
                    <div>
                        <img :src="weatherIcons.sunny" alt="partly cloudy" style="width: 96px; height: 96px">
                    </div>
                </section>
                <div class="forecast-index__body">
                    <section class="forecast-index__ahead">
                        <template v-for="day in forecast.daily">
                            <div :key="getDayKey(day, 'icon')">
                                <icon name="cloud"/>
                            </div>
                            <div :key="getDayKey(day, 'date')">{{ formatDate(day) }}</div>
                            <div :key="getDayKey(day, 'min')">{{ day.temp.min.formatted }}</div>
                            <div :key="getDayKey(day, 'max')">{{ day.temp.max.formatted }}</div>
                        </template>
                    </section>
                </div>
            </template>
        </container>
    </div>
</template>

<script lang="ts">
import WeatherActions from '../../components/weather/actions.vue';

import weatherIcons from '../../assets/images/weather';

import {
    defineComponent
} from 'vue';

import {
    forecast
} from '../../store/index';

import {
    dateFormat
} from '@ocula/utilities';

export default defineComponent({

    components: {
        WeatherActions
    },
    
    setup() {
        function getDayKey(day: any, column: string): string {
            return `${day.dt.raw}-${column}`;
        }

        function formatDate(day: any): string {
            return dateFormat(day.dt.formatted, 'eeee, do MMM');
        }

        return {
            weatherIcons,
            forecast,
            getDayKey,
            formatDate
        };
    }

});
</script>

<style lang="scss">

    .forecast-index {
        color: var(--foreground__colour);
        background: var(--colour__primary);
    }

    .forecast-index__summary {
        padding: var(--spacing__large);
        padding-top: 0;
        min-height: 33vh;
    }

    .forecast-index__summary-temp {
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

    .forecast-index__body {
        color: var(--font__colour);
        background: var(--background__colour);
        border-top-left-radius: var(--border__radius--large);
        border-top-right-radius: var(--border__radius--large);
    }

    .forecast-index__ahead {
        display: grid;
        grid-template-columns: max-content auto max-content max-content;
        gap: var(--spacing__small);
        padding: var(--spacing__large);
    }

</style>