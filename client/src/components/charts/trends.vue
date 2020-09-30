<template>
    <div class="trends-chart">
        <div class="trends-chart__body" :style="bodyStyle">
            <line-chart class="trends-chart__chart" :data="data" :options="options" />
            <div class="trends-chart__now" layout="column center-left">
                <span class="trends-chart__now-label">
                    <slot name="start-label">Now</slot>
                </span>
            </div>
            <template v-for="value in data.slice(1, -1)" :key="keyBy(value)">
                <div class="trends-chart__column">
                    <slot name="primary-column" :value="value"></slot>
                </div>
                <div class="trends-chart__column" v-for="row in secondaryRows" :key="row">
                    <slot name="secondary-column" :value="value" :row="row"></slot>
                </div>
            </template>
            <div class="trends-chart__later" layout="column center-right">
                <span class="trends-chart__later-label">
                    <slot name="end-label">Later</slot>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import LineChart from './line.vue';

import {
    defineComponent,
    computed,
    PropType
} from 'vue';

import type {
    ILineOptions
} from '@ocula/charts';

export default defineComponent({

    components: {
        LineChart
    },
    
    props: {

        data: {
            type: Array,
            default: () => []
        },

        options: {
            type: Object as PropType<ILineOptions>
        },

        keyBy: {
            type: Function
        },

        secondaryRows: {
            type: Number,
            default: 0
        }

    },

    setup(props) {

        const bodyStyle = computed(() => ({
            gridTemplateRows: `repeat(${props.secondaryRows + 2}, auto)`,
            gridTemplateColumns: `2rem repeat(${props.data.length - 2}, 4rem) 2rem`
        }));

        return {
            bodyStyle
        };
    }

});
</script>

<style lang="scss">
    @import "~@ocula/style/src/_mixins.scss";

    .trends-chart {
        overflow: hidden;
        overflow-x: auto;
    }

    .trends-chart__body {
        display: inline-grid;
        padding-bottom: var(--spacing__small);
        grid-auto-flow: column;
        row-gap: var(--spacing__x-small);
        width: auto;
    }

    .trends-chart__chart {
        grid-column: 1 / -1;
        height: 196px;
    }

    .trends-chart__column {
        @include text-truncate;
        padding: 0 var(--spacing__xx-small);
        text-align: center;
    }

    .trends-chart__now,
    .trends-chart__later {
        grid-row: 2 / -1;      
    }

    .trends-chart__now-label,
    .trends-chart__later-label {
        color: var(--font__colour--meta);
        font-size: var(--font__size--x-small);
        text-transform: uppercase;
        transform-origin: center;
    }

    .trends-chart__now-label {
        transform: rotate(90deg);
    }
    
    .trends-chart__later-label {
        transform: rotate(-90deg);
    }

</style>