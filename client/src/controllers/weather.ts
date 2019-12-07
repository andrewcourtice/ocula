import EVENTS from '../constants/events';
import MODULES from '../constants/modules';
import ACTIONS from '../state/weather/actions';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

export class WeatherController extends Controller {

    constructor() {
        super(MODULES.weather);
    }

    get loading() {
        return this.state.loading;
    }

    get lastUpdated() {
        return this.state.lastUpdated;
    }

    get shouldUpdate() {
        return !this.lastUpdated || (Date.now() - this.lastUpdated) > 300000;
    }

    get location() {
        return this.state.location;
    }

    get outlook() {
        return this.state.outlook;
    }

    get radar() {
        return this.state.radar;
    }

    get alerts() {
        return this.state.alerts;
    }

    openAlertsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.alerts);
    }

    async loadLocation(locationId) {
        await this.dispatch(ACTIONS.loadLocation, {
            locationId
        });
    }

    async loadOutlook(locationId) {
        if (!this.shouldUpdate) {
            return;
        }

        return this.dispatch(ACTIONS.loadOutlook, {
            locationId
        });
    }

    async loadRadar(locationId, width) {
        return this.dispatch(ACTIONS.loadRadar, {
            locationId,
            width
        });
    }

}

export default new WeatherController();