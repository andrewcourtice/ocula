<template>
    <div class="forecast-summary" layout="row center-justify">
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
    @import "~@ocula/style/src/_mixins.scss";

    .forecast-summary__temp {
        font-size: 4rem;
        font-weight: var(--font__weight--medium);
        line-height: 1;
    }

    .forecast-summary__figure {
        width: 96px;
        height: 96px;
    }

    @include breakpoint("lg") {
        
        .forecast-summary__figure {
            width: 192px;
            height: 192px;
        }

    }

</style>