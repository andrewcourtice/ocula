<template>
    <div class="spline-chart" ref="element"></div>
</template>

<script lang="ts">
import {
    SplineChart
} from '@ocula/charts';

import chart from './_base/chart';

export default chart(SplineChart);
</script>

<style lang="scss">

    .spline-chart {
        width: 100%;
        height: 196px;
    }

</style>