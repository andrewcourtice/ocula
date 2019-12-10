import GLOBAL from '../../../constants/global';
import EVENTS from '../../../constants/events';

import subscriberMixin from '../../../components/core/mixins/subscriber';

import weatherController from '../../../controllers/weather';
import settingsController from '../../../controllers/settings';

export default function refreshable(method: string = 'load') {

    return {

        data() {
            return {
                loading: false,
                lastUpdated: null
            };
        },

        mixins: [
            subscriberMixin(EVENTS.application.visible, 'refresh'),
            subscriberMixin(EVENTS.weather.locationChanged, 'refresh')
        ],

        computed: {

            canRefresh() {
                return !this.lastUpdated || Date.now() - this.lastUpdated > GLOBAL.updateThreshold;
            }

        },

        methods: {

            async refresh(locationId) {
                if (!this.canRefresh) {
                    return;
                }
                
                const location = locationId || settingsController.location;

                this.loading = true;

                try {
                    const {
                        id
                    } = await weatherController.loadLocation(location);

                    if (method in this) {
                        await this[method](id);
                    }

                    this.lastUpdated = new Date();
                } finally {
                    this.loading = false;
                }
            }

        },

        activated() {
            this.refresh();
        }
    
    };

}