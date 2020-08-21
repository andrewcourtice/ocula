<template>
    <div class="forecast-summary" layout="row center-justify">
        <div>
            <div class="forecast-summary__temp">{{ forecast.current.temp.formatted }}</div>
            <div class="forecast-summary__feels-like">
                <small>Feels like {{ forecast.current.feelsLike.formatted }}</small>
            </div>
            <div class="forecast-summary__description margin__top--medium">{{ forecast.current.weather.description.formatted }}</div>
        </div>
        <div>
            <img :src="getFigure(forecast.current.weather.id.raw)" :alt="forecast.current.weather.description.raw">
        </div>
    </div>
</template>

<script lang="ts">
import getFigure from '../../helpers/get-figure';

import {
    defineComponent
} from "vue";

import {
    forecast
} from '../../store';

export default defineComponent({
    
    setup() {
        return {
            forecast,
            getFigure
        };
    }

});
</script>

<style lang="scss">

    .forecast-summary__temp {
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

</style>