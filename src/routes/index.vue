<template>
    <div class="home">
        <h1>{{ forecast.location }}</h1>
        <pre>
            <code>{{ forecast }}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../controllers/weather';

export default Vue.extend({

    computed: {

        forecast() {
            return weatherController.forecast;
        }

    },

    mounted() {
        weatherController.loadForecast();
    }

});
</script>

<style lang="scss">

    .home {
        padding: 2rem;
    }

</style>