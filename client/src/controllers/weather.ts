import EVENTS from '../constants/events';
import GETTERS from '../state/getters';
import ACTIONS from '../state/actions';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

export class WeatherController extends Controller {

    get isLoading() {
        return this.state.loading;
    }

    get lastUpdated() {
        return this.state.lastUpdated;
    }

    get location() {
        return this.state.location;
    }

    get data() {
        return this.getter(GETTERS.data);
    }

    openAlertsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.alerts);
    }

    async load() {
        return this.dispatch(ACTIONS.load);
    }

}

export default new WeatherController();