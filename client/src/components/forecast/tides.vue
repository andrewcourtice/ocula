<template>
    <div class="forecast-tides">
        <div class="forecast-tides__header" :grid="tides.extremes.length">
            <div class="forecast-tides__observation" v-for="entry in tides.extremes" :key="entry.dt.raw">
                <div class="text--meta">
                    <small>{{ entry.type.formatted }}</small>
                </div>
                <div>{{ getTime(entry) }}</div>
                <div>
                    <small>{{ entry.height.formatted }}</small>
                </div>
            </div>
        </div>
        <trends class="forecast-tides__trends" :data="tides.heights" :options="chartOptions" :key-by="entry => entry.dt.raw">
            <template #start-label="data">{{ getTime(data.value) }}</template>
            <template #primary-column="column">
                <small>{{ getTime(column.value) }}</small>
            </template>
            <template #end-label="data">{{ getTime(data.value) }}</template>
        </trends>
        <div class="forecast-tides__disclaimer">
            <small class="text--meta">All tide measurements are displayed in metres (m)</small>
        </div>
    </div>
</template>

<script lang="ts">
import TIDES_CHART_OPTIONS from '../../constants/forecast/tides-chart-options';

import Trends from '../charts/trends.vue';

import {
    computed,
    defineComponent
} from 'vue';

import {
    forecast,
    format
} from '../../store';

export default defineComponent({

    components: {
        Trends
    },
   
    setup(props) {
        const tides = computed(() => forecast.value.tides);

        function getTime(entry): string {
            return format.value.time(entry.dt.formatted as any, 'h a');
        }

        return {
            tides,
            getTime,
            chartOptions: TIDES_CHART_OPTIONS
        };
    }

});
</script>

<style lang="scss">

    .forecast-tides__header {
        padding: 0 var(--spacing__large);
    }
    
    .forecast-tides__observation {
        text-align: center;
    }

    .forecast-tides__trends {
        margin: var(--spacing__small) 0;
    }

    .forecast-tides__disclaimer {
        text-align: center;
    }

</style>