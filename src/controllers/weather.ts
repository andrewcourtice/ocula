import MODULES from '../constants/modules';
import GETTERS from '../state/weather/getters';
import ACTIONS from '../state/weather/actions';

import Controller from './_base/controller';

export class WeatherController extends Controller {

    constructor() {
        super(MODULES.weather);
    }

    get forecast() {
        return this.getter(GETTERS.forecast);
    }

    get outlook() {
        return this.getter(GETTERS.outlook);
    }

    async load(locationId) {
        return this.dispatch(ACTIONS.loadForecast, {
            locationId
        });
    }

}

export default new WeatherController();