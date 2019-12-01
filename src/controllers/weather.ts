import ACTIONS from '../state/actions';

import Controller from './_base/controller';

export class WeatherController extends Controller {

    get forecast() {
        return this.state.forecast;
    }

    async load() {
        return this.dispatch(ACTIONS.load);
    }

}

export default new WeatherController();