import updateSettings from './update-settings';

import type {
    ILocation
} from '../../types/location';

import {
    state
} from '../store';

export default function removeLocation(location: ILocation): void {
    const {
        locations
    } = state.settings;

    updateSettings({
        locations: locations.filter(({ id }) => id !== location.id)
    });
}