<template>
    <div class="spline-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    SplineChart
} from '@ocula/charts';

import chart from './_base/chart';

export default chart(SplineChart);
</script>

<style lang="scss">

    .spline-chart {
        width: 100%;
        height: 128px;
    }

</style>