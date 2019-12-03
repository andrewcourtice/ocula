<template>
    <card class="weather-today-card">
        <div layout="row center-left">
            <i class="fas fa-cloud-sun fa-3x"></i>
            <div class="margin__left--small">
                <div>{{ currentOutlook.weather.precis }}</div>
                <h1>{{ observations.temperature.temperature }}</h1>
            </div>
        </div>
    </card>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../../../controllers/weather';

export default Vue.extend({
    
    computed: {

        observations() {
            return weatherController.outlook.observations;
        },

        currentOutlook() {
            return weatherController.outlook.current;
        }

    }

});
</script>