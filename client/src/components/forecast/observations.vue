<template>
    <div class="forecast-observations">
        <template v-for="observation in observations">
            <div class="forecast-observations__icon" :key="getKey(observation.id, 'icon')">
                <icon :name="observation.icon"/>
            </div>
            <div class="forecast-observations__details" :key="getKey(observation.id, 'label')">
                <strong>{{ observation.label }}</strong>
                <div>{{ observation.value }}</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import OBSERVATIONS from '../../constants/observations';

import {
    defineComponent,
    computed
} from "vue";

import {
    forecast,
    format
} from '../../store';

import type {
    IObservation
} from '../../constants/observations';

export default defineComponent({
    
    setup() {
        const observations = computed(() => Object.keys(OBSERVATIONS).map(id => {
            const {
                getValue,
                ...observation
            } = OBSERVATIONS[id] as IObservation;

            const value = getValue(forecast.value, format.value);

            return {
                id,
                value,
                ...observation
            };
        }));

        function getKey(id: string, key: string) {
            return `${id}-${key}`;
        }

        return {
            observations,
            getKey
        };
    }

});
</script>

<style lang="scss">

    .forecast-observations {
        display: grid;
        grid-template-columns: max-content 1fr max-content 1fr;
        gap: var(--spacing__small);
        align-items: center;
    }

</style>