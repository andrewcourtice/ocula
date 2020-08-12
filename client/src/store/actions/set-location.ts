import LOCATION from '../../enums/location';
import EVENTS from '../../constants/events';

import updateSettings from './update-settings';

import eventEmitter from '@ocula/event-emitter';

import type {
    ILocation
} from '../../interfaces/location';

export default function setLocation(location: ILocation | LOCATION): void {
    updateSettings({
        location
    });

    eventEmitter.emit(EVENTS.location.set, location);
}