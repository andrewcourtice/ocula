import EVENTS from '../constants/events';
import MODULES from '../constants/modules';
import ACTIONS from '../state/weather/actions';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

export class WeatherController extends Controller {

    constructor() {
        super(MODULES.weather);
    }

    get lastUpdated() {
        return this.state.lastUpdated;
    }

    get shouldUpdate() {
        return !this.lastUpdated || (Date.now() - this.lastUpdated) > 300000;
    }

    get outlook() {
        return this.state.outlook;
    }

    get forecast() {
        return this.state.forecast;
    }

    get alerts() {
        return this.state.alerts;
    }

    openAlertsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.alerts);
    }

    async loadOutlook(locationId) {
        return this.dispatch(ACTIONS.loadOutlook, {
            locationId
        });
    }

    async loadForecast(locationId) {
        return this.dispatch(ACTIONS.loadForecast, {
            locationId
        });
    }

}

export default new WeatherController();