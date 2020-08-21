<template>
    <div class="line-chart" ref="element"></div>
</template>

<script lang="ts">
import {
    LineChart
} from '@ocula/charts';

import chart from './_base/chart';

export default chart(LineChart);
</script>

<style lang="scss">

    .line-chart {
        width: 100%;
        height: 100%;
    }

</style>