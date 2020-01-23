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

    computed: {

        isLoading() {
            return weatherController.isLoading;
        },

        lastUpdated() {
            const lastUpdated = weatherController.lastUpdated;

            if (lastUpdated) {
                return dateFormatDistanceToNow(lastUpdated);
            }
        }

    },

    methods: {

        async refresh(locationId) {
            weatherController.load();
        }

    },

    activated() {
        this.refresh();
    }

};