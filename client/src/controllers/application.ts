import MAP from '../enums/maps/map';

import EVENTS from '../constants/core/events';
import MODALS from '../constants/core/modals';
import DRAWERS from '../constants/core/drawers';

import eventEmitter from '@ocula/event-emitter';

import {
    componentsController
} from '@ocula/components';

import {
    functionDebounce
} from '@ocula/utilities';

const resize = functionDebounce(event => eventEmitter.emit(EVENTS.application.resized, event), 300);

function visibilityChanged() {
    if (!document.hidden) {
        eventEmitter.emit(EVENTS.application.visible);
    }     
}

window.addEventListener('resize', resize)
document.addEventListener('visibilitychange', visibilityChanged);

export class ApplicationController {

    constructor() {

    }

    async setLocation() {
        return componentsController.open(MODALS.locations);
    }

    async setMapType(): Promise<MAP> {
        return componentsController.open(DRAWERS.maps);
    }

    async notify(title: string, options?: NotificationOptions): Promise<Notification> {
        if (Notification.permission !== 'granted') {
            await Notification.requestPermission();
        }
        
        return new Notification(title, options);
    }

}

export default new ApplicationController();