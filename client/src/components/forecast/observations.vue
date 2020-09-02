<template>
    <div class="forecast-observations" grid="2 md-3">
        <observation v-for="observation in observations"
            :key="observation.id"
            :icon="observation.icon"
            :label="observation.label">
            {{ observation.value }}
        </observation>
    </div>
</template>

<script lang="ts">
import OBSERVATIONS from '../../constants/forecast/observations';

import Observation from '../weather/observation.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    forecast,
    format
} from '../../store';

import type {
    IObservation
} from '../../constants/forecast/observations';

export default defineComponent({

    components: {
        Observation
    },
    
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

    }

</style>