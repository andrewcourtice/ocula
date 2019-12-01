<template>
    <div class="home">
        <card>
            <strong>Brisbane</strong>
        </card>
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
        weatherController.load();
    }

});
</script>

<style lang="scss">

    .home {
        padding: 2rem;
    }

</style>