import EVENTS from '../../../constants/events';

import subscriberMixin from '../../../components/core/mixins/subscriber';

export default function refreshable(method: string = 'load') {

    return {

        mixins: [
            subscriberMixin(EVENTS.application.visible, method),
            subscriberMixin(EVENTS.weather.locationChanged, method)
        ],

        activated() {
            this[method]();
        }
    
    };

}