
import LOCATIONS from '../../enums/location';

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

export default async function loadLocation() {
    const {
        location
    } = state.settings;

    let latitude: number,
        longitude: number;

    if (location === LOCATIONS.current) {
        ({
            latitude,
            longitude
        } = await getPosition());
    } else {
        ({
            latitude,
            longitude
        } = location);
    }

    if (!latitude || !longitude) {
        return;
    }

    const response = await getLocation(latitude, longitude);

    mutate(state => state.location = response);

    return response;
} 