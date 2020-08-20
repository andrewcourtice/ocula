<template>
    <section class="forecast-upcoming">
        <template v-for="day in days">
            <div :key="getKey(day, 'icon')">
                <icon :name="getIcon(day.weather.id.raw)"/>
            </div>
            <div :key="getKey(day, 'date')">
                <div>{{ getDate(day) }}</div>
                <div class="text--meta text--tight">
                    <small>{{ day.weather.description.formatted }}</small>
                </div>
            </div>
            <div :key="getKey(day, 'precip')">
                <div layout="row center-left" v-if="day.pop.raw > 0">
                    <div class="text--meta">{{ day.pop.formatted }}</div>
                    <icon name="droplet" class="forecast-upcoming__precip-icon" :style="getPrecipIconStyle(day)"/>
                </div>
            </div>
            <div :key="getKey(day, 'min')" class="text--meta">{{ getMinMax(day.temp.min) }}</div>
            <div :key="getKey(day, 'max')">{{ getMinMax(day.temp.max) }}</div>
        </template>
    </section>
</template>

<script lang="ts">
import getIcon from '../../helpers/get-icon';

import {
    defineComponent,
    computed
} from "vue";

import {
    forecast,
    format
} from '../../store';

export default defineComponent({
    
    setup() {
        const days = computed(() => forecast.value.daily);

        function getKey(day, key: string): string {
            return `${key}-${day.dt.raw}`;
        }

        function getDate(day) {
            return format.value.date(day.dt.formatted);
        }

        function getPrecipIconStyle(day) {
            return {
                opacity: Math.max(day.pop.raw)
            };
        }

        function getMinMax(value) {
            return Math.round(value.raw);
        }

        return {
            days,
            getKey,
            getIcon,
            getDate,
            getPrecipIconStyle,
            getMinMax
        };
    }

});
</script>

<style lang="scss">

    .forecast-upcoming {
        display: grid;
        grid-template-columns: max-content auto max-content max-content max-content;
        gap: var(--spacing__small);
        align-items: center;
    }

    .forecast-upcoming__precip-icon {
        display: block;
        width: 1em;
        height: 1em;
        margin-left: var(--spacing__xx-small);
        stroke: var(--colour__primary);
        fill: var(--colour__primary);
    }

</style>