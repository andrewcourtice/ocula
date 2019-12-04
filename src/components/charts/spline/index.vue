<template>
    <div class="spline-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import SplineChart from './index.ts';

interface IData {
    chart: SplineChart | null
}

export default Vue.extend({

    props: {

        data: {
            type: Array
        },

        options: {
            type: Object
        }

    },

    data(): IData {
        return {
            chart: null
        };
    },

    methods: {

        async render() {
            if (!this.chart) {
                return;
            }

            return this.chart.render(this.data, this.options);
        }

    },
    
    mounted() {
        const chart = new SplineChart(this.$el);
        console.log(chart);

        this.chart = chart;

        this.render();
    },

    watch: {

        data() {
            this.render();
        },

        options() {
            this.render();
        }

    }

});
</script>

<style lang="scss">

    .spline-chart {
        min-height: 196px;
    }

</style>