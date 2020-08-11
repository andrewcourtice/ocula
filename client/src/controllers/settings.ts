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

import {
    ISettings
} from '../interfaces/storage';

export class SettingsController extends Controller<IState> {

    get data() {
        return this.state.settings;
    }

    get location() {
        return this.data.location;
    }

    get locations() {
        return this.data.locations;
    }

    set location(location: ILocation | string) {
        this.commit(MUTATIONS.clearLastUpdated);
        
        this.updateSettings({
            location
        });

        eventEmitter.emit(EVENTS.weather.locationChanged);
    }

    updateSettings(settings: Partial<ISettings>): void {
        this.commit(MUTATIONS.updateSettings, settings);
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