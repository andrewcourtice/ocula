import EVENTS from '../constants/events';
import MUTATIONS from '../state/mutations'

import eventEmitter from '@ocula/event-emitter';

import {
    Workbox
} from 'workbox-window';

export default async function initialiseWorker(store) {
    if (!navigator.serviceWorker) {
        return;
    }

    window.addEventListener('load', () => {
        const workbox = new Workbox('/service-worker.js');

        workbox.addEventListener('installed', event => {
            if (!event.isUpdate) {
                return;
            }

            store.commit(MUTATIONS.setUpdateReady);
            eventEmitter.emit(EVENTS.application.updateReady);
        });

        workbox.register();
    });
}