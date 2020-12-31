import LOCATION from '../../enums/forecast/location';
import EVENTS from '../../constants/core/events';

import setLastUpdated from '../mutations/set-last-updated';

import updateSettings from './update-settings';

import eventEmitter from '@ocula/event-emitter';

import {
    typeIsNil
} from '@ocula/utilities';

import type {
    ILocation
} from '../../types/location';

export default function setLocation(location: ILocation | LOCATION): void {
    if (typeIsNil(location)) {
        return;
    }
    
    setLastUpdated(null);

    updateSettings({
        location
    });

    eventEmitter.emit(EVENTS.location.set, location);
}