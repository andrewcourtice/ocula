import LOCATION from '../../enums/forecast/location';

import {
    state,
    mutate
} from '../store';

import {
    getPosition
} from '../helpers/location';

import {
    getLocation
} from '../../services/location';

import type {
    ILocation
} from '../../interfaces/location';

export default async function loadLocation(): Promise<ILocation> {
    const {
        location: savedLocation
    } = state.settings;

    let location = savedLocation;

    if (location === LOCATION.current) {
        const {
            latitude,
            longitude
        } = await getPosition();

        if (!latitude || !longitude) {
            return;
        }

        location = await getLocation(latitude, longitude);
    } 

    mutate('set-location', state => state.location = location as ILocation);

    return location;
} 