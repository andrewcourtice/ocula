import EVENTS from '../constants/events';
import MODALS from '../constants/modals';
import SIDEBARS from '../constants/sidebars';

import eventEmitter from '@ocula/event-emitter';

import logo from '../assets/images/ocula-192.png';

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

async function notify(title: string, options?: NotificationOptions): Promise<Notification> {
    if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
    }
    
    return new Notification(title, options);
}

window.addEventListener('resize', resize)
document.addEventListener('visibilitychange', visibilityChanged);

export class ApplicationController {

    constructor() {
        eventEmitter.on(EVENTS.application.updateReady, async () => {
            const notification = await notify('Update Available', {
                icon: logo,
                badge: logo,
                body: 'An update to Ocula is available. Tap here to update now.',
                requireInteraction: true
            });

            notification.onclick = () => {
                window.location.reload();
                notification.close();
            };
        });
    }

    async editLocations() {
        return componentsController.open(MODALS.locations);
    }

    async navigate() {
        return componentsController.open(SIDEBARS.navigation);
    }

    async notify(title: string, options?: NotificationOptions): Promise<Notification> {
        return notify(title, options);
    }

}

export default new ApplicationController();