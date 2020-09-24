<template>
    <transition-box-resize class="forecast-today" grid="3">
        <div class="forecast-today__observation" v-for="observation in observations" :key="observation.label">
            <div class="text--meta">
                <small>{{ observation.label }}</small>
            </div>
            <div>{{ observation.value }}</div>
        </div>
    </transition-box-resize>
    <div class="margin__top--small text--centre">
        <icon-button :icon="detailedViewButton.icon" v-tooltip="detailedViewButton.tooltip" @click="toggleDetailedView"></icon-button>
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

        const detailedViewButton = computed(() => ({
            icon: showDetailedView.value ? 'arrow-up-s-line' : 'arrow-down-s-line',
            tooltip: `Show ${showDetailedView.value ? 'less' : 'more'} detail`
        }));

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
                    icon: 'temp-cold-line',
                    label: 'Temp',
                    value: `${numberRound(today.temp.min.raw)} / ${numberRound(today.temp.max.raw)}`
                },
                {
                    icon: 'contrast-drop-2-line',
                    label: 'Humidity',
                    value: current.humidity.formatted
                },
                {
                    icon: 'rainy-line',
                    label: 'Precipitation',
                    value: `${today.pop.formatted} chance`
                },
                {
                    icon: 'sun-line',
                    label: 'Sunrise',
                    value: format.value.time(today.sunrise.formatted as any)
                },
                {
                    icon: 'moon-line',
                    label: 'Sunset',
                    value: format.value.time(today.sunset.formatted as any)
                },
                {
                    icon: 'windy-line',
                    label: 'Wind',
                    value: `${current.windSpeed.formatted} ${current.windDeg.formatted}`
                },
                {
                    icon: 'swap-line',
                    label: 'Pressure',
                    value: current.pressure.formatted
                },
                {
                    icon: 'cloudy-line',
                    label: 'Cloud Cov.',
                    value: current.clouds.formatted
                },
                {
                    icon: 'eye-line',
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
            detailedViewButton,
            toggleDetailedView
        };
    }

});
</script>

<style lang="scss">

    .forecast-today__observation {
        text-align: center;
    }

</style>