<template>
    <div class="weather-outlook">
        <today-card></today-card>
        <router-link to="/weather/forecast" class="link">
            <forecast-card></forecast-card>
        </router-link>
        <observations-card></observations-card>
        <router-link to="/weather/trends" class="link">
            <trends-card></trends-card>
        </router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import TodayCard from '../../components/weather/cards/today.vue';
import ForecastCard from '../../components/weather/cards/forecast.vue';
import ObservationsCard from '../../components/weather/cards/observations.vue';
import TrendsCard from '../../components/weather/cards/trends.vue';
import RadarCard from '../../components/weather/cards/radar.vue';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

import refreshable from './_base/refreshable';

export default Vue.extend({

    extends: refreshable(),

    methods: {

        async load(locationId: number) {    
            await Promise.all([
                weatherController.loadToday(locationId),
                weatherController.loadTrends(locationId),
                weatherController.loadForecast(locationId)
            ]);
        }

    },

    components: {
        TodayCard,
        ForecastCard,
        ObservationsCard,
        TrendsCard,
        RadarCard
    }

});
</script>

<style lang="scss">

    .weather-outlook {

        & .card:not(:last-child) {
            margin-bottom: var(--spacing__small);
        }
    }

</style>