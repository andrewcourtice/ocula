import GETTERS from '../state/getters';
import ACTIONS from '../state/actions';

import Controller from './_base/controller';

export class WeatherController extends Controller {

    get location() {
        return this.getter(GETTERS.location);
    }

    get forecast() {
        return this.getter(GETTERS.forecast);
    }

    get outlook() {
        return this.getter(GETTERS.outlook);
    }

    async load() {
        return this.dispatch(ACTIONS.load);
    }

}

export default new WeatherController();