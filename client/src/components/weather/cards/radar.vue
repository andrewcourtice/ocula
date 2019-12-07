<template>
    <card class="weather-radar-card">
        <radar></radar>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import Radar from '../core/radar.vue';

export default Vue.extend({
    
    components: {
        Radar
    }

});
</script>

<style lang="scss">

    .weather-radar-card {

        & .card__body {
            padding: 0;
        }
    }

</style>