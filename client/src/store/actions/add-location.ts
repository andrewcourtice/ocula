import updateSettings from './update-settings';
import setLocation from './set-location';

import type {
    ILocation
} from '../../interfaces/location';

import {
    state
} from '../store';

import {
    arrayUniqueBy
} from '@ocula/utilities';

export default function addLocation(location: ILocation, setAsCurrent: boolean = false): void {
    const {
        locations
    } = state.settings;
    
    updateSettings({
        locations: arrayUniqueBy([...locations, location], ({ id }) => id) 
    });

    if (setAsCurrent) {
        setLocation(location);
    }
}