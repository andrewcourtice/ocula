import ACTIONS from '../state/actions';

import Controller from './_base/controller';

export class ForecastController extends Controller {

    get location() {
        return this.state.forecast.location;
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

    async loadForecast() {
        return this.dispatch(ACTIONS.loadForecast);
    }

}

export default new ForecastController();