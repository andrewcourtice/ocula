import GLOBAL from '../../../constants/global';
import EVENTS from '../../../constants/events';

import subscriberMixin from '../../../components/core/mixins/subscriber';

import weatherController from '../../../controllers/weather';
import settingsController from '../../../controllers/settings';

export default {

    mixins: [
        subscriberMixin(EVENTS.application.visible, 'refresh'),
        subscriberMixin(EVENTS.weather.locationChanged, 'refresh')
    ],

    computed: {

        isLoading() {
            return weatherController.isLoading;
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