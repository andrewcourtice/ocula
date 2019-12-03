<template>
    <div class="outlook">
        <card v-if="observations && currentOutlook">
            <span>Today</span>
            <div layout="row center-left">
                <i class="fas fa-cloud-sun fa-3x"></i>
                <div style="margin-left: 1rem;">
                    <div>{{ currentOutlook.weather.precis }}</div>
                    <h1>{{ observations.temperature.temperature }}</h1>
                </div>
            </div>
        </card>
        <card v-if="weekOutlook" style="margin-top: 2rem">
            <div v-for="day in weekOutlook" :key="day.dateTime" layout="row center-justify">
                <span>{{ (new Date(day.dateTime)).getDate() }}</span>
                <div layout="row center-right">
                    <span>min {{ day.min }}</span>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <span>max {{ day.max }}</span>
                </div>
            </div>
        </card>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import locationController from '../../controllers/location';
import weatherController from '../../controllers/weather';

export default Vue.extend({

    computed: {

        outlook() {
            return weatherController.outlook;
        },

        observations() {
            return this.outlook.observations;
        },

        currentOutlook() {
            return this.outlook.current;
        },

        weekOutlook() {
            return this.outlook.week;
        }

    },

    mounted() {
        weatherController.loadOutlook(locationController.id);
    }

});
</script>