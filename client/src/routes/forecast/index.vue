<template>
    <div class="route forecast-index transition-theme-change" layout="column top-stretch" :class="theme.weather.class">
        <container class="forecast-index__header">
            <weather-actions></weather-actions>
            <header class="forecast-index__summary" layout="column center-stretch" v-if="forecast">
                <forecast-summary></forecast-summary>
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
            </container>
        </div>
    </div>
</template>

<script lang="ts">
import FORECAST_SECTIONS from '../../constants/forecast/sections';

import WeatherActions from '../../components/weather/actions.vue';
import ForecastSummary from '../../components/forecast/summary.vue';

import setThemeMeta from '../../helpers/set-theme-meta';

import {
    defineComponent,
    watch,
    computed
} from 'vue';

import {
    theme,
    state,
    forecast
} from '../../store';

export default defineComponent({

    components: {
        WeatherActions,
        ForecastSummary
    },
    
    setup() {
        const sections = computed(() => {
            const visibleSections = state.settings.forecast.sections.filter(({ visible }) => !!visible);

            return visibleSections.map(({ type }) => ({
                id: type,
                class: `forecast-index__block--${type}`,
                ...FORECAST_SECTIONS[type]
            }));
        });

        watch(() => theme.value.weather, ({ colour }) => setThemeMeta(colour));

        return {
            theme,
            forecast,
            sections
        };
    }

});
</script>

<style lang="scss">
    @import "~@ocula/style/src/_mixins.scss";

    .forecast-index {
        color: var(--font__colour--weather);
        background: var(--background__colour--weather);
    }

    .forecast-index__summary {
        min-height: 30vh;
        padding: var(--spacing__large);
        padding-top: 0;
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

    @include breakpoint("lg") {

        .forecast-index__body {
            border-radius: 0;
        }

    }

</style>