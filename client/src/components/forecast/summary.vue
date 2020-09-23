<template>
    <div class="forecast-summary">
        <div layout="row center-justify">
            <div>
                <div class="forecast-summary__temp">{{ forecast.current.temp.formatted }}</div>
                <div class="forecast-summary__feels-like">
                    <small>Feels like {{ forecast.current.feelsLike.formatted }}</small>
                </div>
                <div class="forecast-summary__description">
                    <small>{{ forecast.current.weather.description.formatted }}</small>
                </div>
            </div>
            <div>
                <img class="forecast-summary__figure" :src="getFigure(forecast.current.weather.id.raw)" :alt="forecast.current.weather.description.raw">
            </div>
        </div>
        <div class="forecast-summary__last-updated" v-if="lastUpdated">
            <small>Updated {{ lastUpdated }} ago</small>
        </div>
    </div>
</template>

<script lang="ts">
import getFigure from '../../helpers/get-figure';

import {
    defineComponent,
    ref
} from "vue";

import {
    state,
    forecast
} from '../../store';

import {
    useTimer
} from '@ocula/components';

import {
    dateFormatDistanceToNow
} from '@ocula/utilities';

export default defineComponent({
    
    setup() {
        const lastUpdated = ref('');

        useTimer(() => {
            if (state.lastUpdated) {
                lastUpdated.value = dateFormatDistanceToNow(state.lastUpdated);
            }
        }, 10000);

        return {
            lastUpdated,
            forecast,
            getFigure
        };
    }

});
</script>

<style lang="scss">
    @import "~@ocula/style/src/_mixins.scss";

    .forecast-summary__temp {
        margin-bottom: var(--spacing__small);
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

    .forecast-summary__figure {
        width: 96px;
        height: 96px;
    }

    .forecast-summary__last-updated {
        margin-top: var(--spacing__large);
        opacity: 0.5;
    }

    @include breakpoint("lg") {
        
        .forecast-summary__figure {
            width: 192px;
            height: 192px;
        }

    }

</style>