import LOCATION from '../../enums/location';
import EVENTS from '../../constants/events';

import setLastUpdated from '../mutations/set-last-updated';

import updateSettings from './update-settings';

import eventEmitter from '@ocula/event-emitter';

import type {
    ILocation
} from '../../interfaces/location';

export default function setLocation(location: ILocation | LOCATION): void {
    setLastUpdated(null);

    updateSettings({
        location
    });

    eventEmitter.emit(EVENTS.location.set, location);
}