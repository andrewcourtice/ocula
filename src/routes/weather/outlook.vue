<template>
    <div class="weather-outlook" v-if="!loading">
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

import locationController from '../../controllers/location';
import weatherController from '../../controllers/weather';

import subscriberMixin from '../../components/mixins/subscriber';

export default Vue.extend({

    mixins: [
        subscriberMixin(EVENTS.application.visible, 'load')
    ],

    data() {
        return {
            loading: true
        };
    },

    methods: {

        async load() {        
            if (!weatherController.shouldUpdate) {
                return;
            }

            this.loading = true;
    
            try {
                await weatherController.loadOutlook(locationController.id);
            } finally {
                this.loading = false;
            }
        }

    },

    activated() {
        this.load()
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