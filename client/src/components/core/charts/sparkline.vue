<template>
    <div class="sparkline-chart"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import {
    SparklineChart
} from '@ocula/charts';

import chart from './_base/chart';

export default chart(SparklineChart);
</script>

<style lang="scss">

    .sparkline-chart {
        width: 100%;
        height: 48px;
    }

</style>