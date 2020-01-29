import EVENTS from '../constants/events';
import LOCATIONS from '../constants/locations';
import MUTATIONS from '../state/mutations';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

import {
    searchLocations
} from '../services/location';

import {
    ILocation
} from '../interfaces/location';

import {
    IState
} from '../interfaces/state';

export class SettingsController extends Controller<IState> {

    get location() {
        return this.state.settings.location;
    }

    get locations() {
        return this.state.settings.locations;
    }

    set location(location: ILocation | string) {
        this.commit(MUTATIONS.clearLastUpdated);
        this.commit(MUTATIONS.updateSettings, {
            location
        });

        eventEmitter.emit(EVENTS.weather.locationChanged);
    }

    setCurrentLocation() {
        this.location = LOCATIONS.current;
    }

    addLocation(location: ILocation): void {
        const locations = this.locations;
        const isAlreadyAdded = locations.some(({ id }) => location.id === id);

        if (!isAlreadyAdded) {
            this.commit(MUTATIONS.updateSettings, {
                locations: [].concat(locations, location)
            });
        }
    }

    removeLocation(location: ILocation): void {
        console.log(location);
        const locations = this.locations.filter(({ id }) => id !== location.id);

        this.commit(MUTATIONS.updateSettings, {
            locations
        });
    }

    async updateLocation() {
        const location = await new Promise((resolve, reject) => {
            eventEmitter.emit(EVENTS.modals.location, resolve, reject);
        });
    }

    async searchLocations(query: string): Promise<ILocation[]> {
        return searchLocations(query);
    }

}

export default new SettingsController();