<template>
    <div class="forecast-uv-index">
        <div class="forecast-uv-index__bar-wrapper">
            <div class="forecast-uv-index__bar" :style="barStyle">
                <div class="forecast-uv-index__marker" :data-value="markerValue" :style="markerStyle"></div>
            </div>
        </div>
        <div class="forecast-uv-index__legend" layout="rows center-center">
            <div class="forecast-uv-index__legend-key" layout="row center-left" v-for="key in legend" :key="key.id">
                <div class="forecast-uv-index__legend-key-icon" :style="{ background: key.colour }"></div>
                <small class="text--meta">{{ key.label }}</small>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import UVINDEX from '../../constants/forecast/uv-index';

import {
    defineComponent,
    computed
} from 'vue';

import {
    forecast
} from '../../store';

import {
    arrayJoinBy,
    numberMaxBy,
    numberRound,
    scaleContinuous
} from '@ocula/utilities';

const MIN = 0;
const MAX = numberMaxBy(UVINDEX, ({ start }) => start).start + 2;

const offsetScale = scaleContinuous([MIN, MAX], [0, 100]);

export default defineComponent({

    setup(props) {
        const gradient = arrayJoinBy(UVINDEX, ({ colour, start }) => `${colour} ${offsetScale(start)}%`);

        const barStyle = {
            background: `linear-gradient(to right, ${gradient})`
        };

        const markerValue = computed(() => forecast.value.current.uvi.formatted);

        const markerStyle = computed(() => ({
            left: `${numberRound(offsetScale(forecast.value.current.uvi.raw, true), 2)}%`
        }));

        return {
            barStyle,
            markerValue,
            markerStyle,
            legend: UVINDEX
        };
    }

});
</script>

<style lang="scss">

    .forecast-uv-index__bar-wrapper {
        padding: 2rem 0 var(--spacing__x-small) 0;
    }

    .forecast-uv-index__bar {
        position: relative;
        display: block;
        width: 100%;
        height: 0.5rem;
        border-radius: 0.25rem;
    }

    .forecast-uv-index__marker {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        overflow: visible;
        transition: left var(--transition__timing--long) var(--transition__easing--default);

        &::before,
        &::after {
            position: absolute;
            display: block;
            content: '';
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
        }

        &::before {
            margin-bottom: 0.1rem;
            border-top: 0.5rem solid var(--background__colour--hover);
            border-left: 0.5rem solid transparent;
            border-right: 0.5rem solid transparent;
        }

        &::after {
            content: attr(data-value);
            margin-bottom: 0.6rem;
            padding: var(--spacing__xx-small) var(--spacing__x-small);
            font-size: var(--font__size--small);
            font-weight: var(--font__weight--heavy);
            background: var(--background__colour--hover);
            border-radius: var(--border__radius);
        }
    }

    .forecast-uv-index__legend-key {
        width: auto;
        margin: var(--spacing__xx-small) var(--spacing__x-small);
    }

    .forecast-uv-index__legend-key-icon {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: var(--spacing__xx-small);
    }

</style>