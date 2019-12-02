<template>
    <div class="home">
        <card v-if="outlook">
            <strong>Today</strong>
            <div>{{ outlook.weather.precis }}</div>
            <h1>{{ outlook.temperature.temperature }}</h1>
        </card>
        <card v-if="forecast" style="margin-top: 2rem">
            <div v-for="day in forecast" :key="day.date" layout="row center-justify">
                <span>{{ day.date.getDate() }}</span>
                <div layout="row center-right">
                    <span>min {{ day.weather.entries[0].min }}</span>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <span>max {{ day.weather.entries[0].max }}</span>
                </div>
            </div>
        </card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../controllers/weather';

export default Vue.extend({

    computed: {

        outlook() {
            return weatherController.outlook;
        },

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