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

        async refresh(locationId) {
            return weatherController.load();
        }

    },

    activated() {
        console.log('activated');
        this.refresh();

        this.intervalHandle = window.setInterval(() => {
            const lastUpdated = weatherController.lastUpdated;

            if (lastUpdated) {
                this.lastUpdated = dateFormatDistanceToNow(lastUpdated);
            }
        }, 1000);
    },

    deactivated() {
        window.clearInterval(this.intervalHandle);
    }

};