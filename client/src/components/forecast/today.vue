<template>
    <transition-box-resize class="forecast-today">
        <div v-for="observation in observations" :key="observation.label">
            <div class="text--meta">
                <small>{{ observation.label }}</small>
            </div>
            <div>{{ observation.value }}</div>
        </div>
    </transition-box-resize>
    <div class="margin__top--small text--centre">
        <button class="button button--ghost text--meta" @click="toggleDetailedView">{{ detailedViewLabel }} Detail</button>
    </div>
</template>

<script lang="ts">
import Observation from '../weather/observation.vue';

import {
    defineComponent,
    ref,
    computed
} from 'vue';

import {
    forecast,
    format
} from '../../store';

import {
    numberRound
} from '@ocula/utilities';

export default defineComponent({

    components: {
        Observation
    },
    
    setup() {
        const showDetailedView = ref(false);

        const detailedViewLabel = computed(() => showDetailedView.value ? 'Less' : 'More');

        function toggleDetailedView() {
            showDetailedView.value = !showDetailedView.value;
        }

        const observations = computed(() => {
            const {
                today,
                current
            } = forecast.value;

            const output = [
                {
                    label: 'Temp',
                    value: `${numberRound(today.temp.min.raw)} / ${numberRound(today.temp.max.raw)}`
                },
                {
                    label: 'Humidity',
                    value: current.humidity.formatted
                },
                {
                    label: 'Precipitation',
                    value: today.pop.formatted
                },
                {
                    label: 'Sunrise',
                    value: format.value.time(today.sunrise.formatted as any)
                },
                {
                    label: 'Sunset',
                    value: format.value.time(today.sunset.formatted as any)
                },
                {
                    label: 'Wind',
                    value: `${current.windSpeed.formatted} ${current.windDeg.formatted}`
                },
                {
                    label: 'Pressure',
                    value: current.pressure.formatted
                },
                {
                    label: 'Cloud Cov.',
                    value: current.clouds.formatted
                },
                {
                    label: 'Visibility',
                    value: current.visibility.formatted
                }
            ];

            if (showDetailedView.value) {
                return output;
            }

            return output.slice(0, 6);
        });

        return {
            observations,
            detailedViewLabel,
            toggleDetailedView
        };
    }

});
</script>

<style lang="scss">

    .forecast-today {
        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: var(--spacing__small);
    }

</style>