<template>
    <div class="home">
        <h1>{{ location.name }}</h1>
        <pre>
            <code>{{ forecast }}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import forecastController from '../controllers/forecast';

export default Vue.extend({

    computed: {

        location() {
            return forecastController.location;
        },

        forecast() {
            return forecastController.current;
        }

    },

    mounted() {
        forecastController.loadForecast();
    }

});
</script>

<style lang="scss">

    .home {
        padding: 2rem;
    }

</style>