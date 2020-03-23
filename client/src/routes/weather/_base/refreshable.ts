import EVENTS from '../../../constants/events';

import subscriberMixin from '../../../components/core/mixins/subscriber';

import weatherController from '../../../controllers/weather';

import {
    dateFormatDistanceToNow
} from '@ocula/utilities';

export default {

    mixins: [
        subscriberMixin(EVENTS.application.visible, 'refresh'),
        subscriberMixin(EVENTS.weather.locationChanged, 'refresh')
    ],

    data() {
        return {
            lastUpdated: null,
            intervalHandle: null
        };
    },

    computed: {

        isLoading() {
            return weatherController.isLoading;
        }

    },

    methods: {

        async refresh() {
            return weatherController.load();
        }

    },

    activated() {
        this.refresh();

        this.intervalHandle = window.setInterval(() => {
            const lastUpdated = weatherController.lastUpdated;

            if (!lastUpdated) {
                return;
            }

            try {
                this.lastUpdated = dateFormatDistanceToNow(lastUpdated);
            } catch (error) {
                this.lastUpdated = 'unknown';
            }
        }, 5000);
    },

    deactivated() {
        window.clearInterval(this.intervalHandle);
    }

};