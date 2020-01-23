import EVENTS from '../constants/events';
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

    get current() {
        return this.state.forecast.currently;
    }

    get daily() {
        return this.state.forecast.daily;
    }

    get hourly() {
        return this.state.forecast.hourly;
    }

    get radar() {
        return this.state.forecast.radar;
    }

    get alerts() {
        return this.state.forecast.alerts;
    }

    openAlertsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.alerts);
    }

    async load() {
        return this.dispatch(ACTIONS.load);
    }

}

export default new WeatherController();