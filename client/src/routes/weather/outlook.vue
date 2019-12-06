<template>
    <div class="weather-outlook" v-if="outlook">
        <today-card></today-card>
        <week-card></week-card>
        <observations-card></observations-card>
        <trends-card></trends-card>
    </div>
</template>

<script lang="ts">
import EVENTS from '../../constants/events';

import Vue from 'vue';

import TodayCard from '../../components/weather/cards/today.vue';
import WeekCard from '../../components/weather/cards/week.vue';
import ObservationsCard from '../../components/weather/cards/observations.vue';
import TrendsCard from '../../components/weather/cards/trends.vue';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

import refreshable from './_base/refreshable';

export default Vue.extend({

    extends: refreshable(),

    computed: {

        outlook() {
            return weatherController.outlook;
        }

    },

    methods: {

        async load(locationId: number) {    
            const id = locationId || settingsController.location;

            await weatherController.loadOutlook(id);
        }

    },

    components: {
        TodayCard,
        WeekCard,
        ObservationsCard,
        TrendsCard
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