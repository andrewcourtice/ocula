import MODULES from '../constants/modules';
import ACTIONS from '../state/location/actions';

import Controller from './_base/controller';

export class LocationController extends Controller {

    constructor() {
        super(MODULES.location);
    }

    get id() {
        console.log(this.state);
        return this.state.location.id;
    }
    
    get name() {
        return this.state.location.name;
    }

    async load(locationId) {
        return this.dispatch(ACTIONS.loadLocation, {
            locationId
        });
    }

}

export default new LocationController();