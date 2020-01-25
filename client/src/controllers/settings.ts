import EVENTS from '../constants/events';
import LOCATIONS from '../constants/locations';
import MUTATIONS from '../state/mutations';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

import {
    searchLocations
} from '../services/location';

import {
    functionDebounce
} from '@ocula/utilities';

const debouncedLocationSearch = functionDebounce(searchLocations, 500);

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
        return debouncedLocationSearch(query);
    }

}

export default new SettingsController();