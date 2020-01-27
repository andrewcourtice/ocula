import EVENTS from '../constants/events';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

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

export class ApplicationController extends Controller {

    constructor() {
        super();

        eventEmitter.on(EVENTS.application.updateReady, async () => {
            const notification = await notify('Update Available', {
                icon: '../assets/favicon.png',
                badge: '../assets/favicon.png',
                body: 'An update to Ocula is available. Tap here to update now.',
                requireInteraction: true,
                renotify: true
            });

            notification.onclick = () => {
                window.location.reload();
                notification.close();
            };
        });
    }

    get updateReady() {
        return this.state.updateReady;
    }

    openOptionsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.options);
    }

    async notify(title: string, options?: NotificationOptions): Promise<Notification> {
        return notify(title, options);
    }

}

export default new ApplicationController();