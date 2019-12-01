import ACTIONS from '../state/actions';

import Controller from './_base/controller';

export class WeatherController extends Controller {

    get forecast() {
        return this.state.weather.forecast;
    }

    async loadForecast() {
        return this.dispatch(ACTIONS.loadForecast);
    }

}

export default new WeatherController();