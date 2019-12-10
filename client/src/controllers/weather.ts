import EVENTS from '../constants/events';
import MODULES from '../constants/modules';
import ACTIONS from '../state/weather/actions';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

export class WeatherController extends Controller {

    constructor() {
        super(MODULES.weather);
    }

    get data() {
        return this.state.data;
    }

    get location() {
        return this.data.location;
    }

    get today() {
        return this.data.today;
    }

    get trends() {
        return this.data.trends;
    }

    get forecast() {
        return this.data.forecast;
    }

    get radar() {
        return this.data.radar;
    }

    get warnings() {
        return this.data.warnings;
    }

    openAlertsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.alerts);
    }

    async loadLocation(locationId) {
        return this.dispatch(ACTIONS.loadLocation, {
            locationId
        });
    }

    async loadToday(locationId) {
        return this.dispatch(ACTIONS.loadToday, {
            locationId
        });
    }

    async loadTrends(locationId) {
        return this.dispatch(ACTIONS.loadTrends, {
            locationId
        });
    }

    async loadForecast(locationId) {
        return this.dispatch(ACTIONS.loadForecast, {
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