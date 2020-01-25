import EVENTS from '../constants/events';
import LOCATIONS from '../constants/locations';
import MUTATIONS from '../state/mutations';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

import {
    searchLocations
} from '../services/location';

export class SettingsController extends Controller {

    get location() {
        return this.state.settings.location;
    }

    set location(value) {
        this.commit(MUTATIONS.updateSettings, {
            location: value
        });

        eventEmitter.emit(EVENTS.weather.locationChanged);
    }

    setCurrentLocation() {
        this.location = LOCATIONS.current;
    }

    async updateLocation() {
        const location = await new Promise((resolve, reject) => {
            eventEmitter.emit(EVENTS.modals.location, resolve, reject);
        });
    }

    async searchLocations(query: string) {
        return searchLocations(query);
    }

}

export default new SettingsController();