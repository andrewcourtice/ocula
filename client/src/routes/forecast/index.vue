<template>
    <div class="route forecast-index transition-theme-change" layout="column top-stretch" :class="theme.weather.class">
        <container class="forecast-index__header">
            <weather-actions></weather-actions>
            <header class="forecast-index__summary" layout="row center-justify" v-if="forecast">
                <div>
                    <div class="forecast-index__summary-temp">{{ forecast.current.temp.formatted }}</div>
                    <div class="forecast-index__summary-feels-like">
                        <small>Feels like {{ forecast.current.feelsLike.formatted }}</small>
                    </div>
                    <div class="forecast-index__summary-description margin__top--medium">{{ forecast.current.weather.description.formatted }}</div>
                </div>
                <div>
                    <img :src="getFigure(forecast.current.weather.id.raw)" :alt="forecast.current.weather.description.raw">
                </div>
            </header>
        </container>
        <div class="forecast-index__body" self="size-x1" v-if="forecast">
            <container class="forecast-index__container">
                <block class="forecast-index__block"
                    v-for="section in sections"
                    :key="section.id"
                    :class="section.class"
                    :title="section.label">
                    <component :is="section.component"/>
                </block>
                <footer class="forecast-index__last-updated">
                    <small>
                        <template v-if="lastUpdated">Updated {{ lastUpdated }} ago</template>
                        <template v-else>Not updated yet</template>
                    </small>
                </footer>
            </container>
        </div>
    </div>
</template>

<script lang="ts">
import FORECAST_SECTIONS from '../../constants/sections';

import WeatherActions from '../../components/weather/actions.vue';

import getFigure from '../../helpers/get-figure';
import setThemeMeta from '../../helpers/set-theme-meta';

import {
    defineComponent,
    ref,
    watch,
    computed
} from 'vue';

import {
    theme,
    state,
    forecast,
    format
} from '../../store';

import {
    useTimer
} from '@ocula/components';

import {
    dateFormat,
    dateFormatDistanceToNow
} from '@ocula/utilities';

export default defineComponent({

    components: {
        WeatherActions
    },
    
    setup() {
        const lastUpdated = ref('');

        const sections = computed(() => {
            const visibleSections = state.settings.forecast.sections.filter(({ visible }) => !!visible);

            return visibleSections.map(({ type }) => ({
                id: type,
                class: `forecast-index__block--${type}`,
                ...FORECAST_SECTIONS[type]
            }));
        });

        function getDayKey(day: any, column: string): string {
            return `${day.dt.raw}-${column}`;
        }

        useTimer(() => {
            if (state.lastUpdated) {
                lastUpdated.value = dateFormatDistanceToNow(state.lastUpdated);
            }
        }, 10000);

        watch(() => theme.value.weather, ({ colour }) => setThemeMeta(colour));

        return {
            theme,
            forecast,
            sections,
            getDayKey,
            getFigure,
            lastUpdated
        };
    }

});
</script>

<style lang="scss">

    .forecast-index {
        color: var(--font__colour--weather);
        background: var(--background__colour--weather);
    }

    .forecast-index__summary {
        min-height: 30vh;
        padding: var(--spacing__large);
        padding-top: 0;
    }

    .forecast-index__summary-temp {
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

    .forecast-index__body {
        padding-top: var(--spacing__small);
        color: var(--font__colour);
        background: var(--background__colour);
        border-top-left-radius: var(--border__radius--large);
        border-top-right-radius: var(--border__radius--large);
    }

    .forecast-index__block {
        
        &:not(:last-of-type) {
            margin-bottom: var(--spacing__small);
        }

        & .block__header,
        & .block__body {
            padding-left: var(--spacing__large);
            padding-right: var(--spacing__large);
        }
    }

    .forecast-index__block--hourly-forecast {

        & .block__body {
            padding-left: 0;
            padding-right: 0;
        }
    }

    .forecast-index__last-updated {
        padding: var(--spacing__small) var(--spacing__large);
        color: var(--font__colour--meta);
        text-align: center;
    }

</style>