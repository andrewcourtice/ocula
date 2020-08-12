import EVENTS from '../constants/events';
import STORAGE_KEYS from '../constants/storage-keys';

import eventEmitter from '@ocula/event-emitter';

import {
    Workbox
} from 'workbox-window';

export default async function initialiseWorker() {
    if (!navigator.serviceWorker) {
        return;
    }

    window.addEventListener('load', () => {
        const workbox = new Workbox('/service-worker.js');

        workbox.addEventListener('installed', event => {
            if (!event.isUpdate) {
                return;
            }
            
            // Clear any saved data
            localStorage.removeItem(STORAGE_KEYS.data);

            //store.commit(MUTATIONS.setUpdateReady);
            eventEmitter.emit(EVENTS.application.updateReady);
        });

        workbox.register();
    });
}