import STORAGE_KEYS from '../constants/core/storage-keys';

import {
    Workbox,
    messageSW
} from 'workbox-window';

import {
    componentsController
} from '@ocula/components';

import type {
    WorkboxLifecycleWaitingEvent
} from 'workbox-window/utils/WorkboxEvent';

export default async function initialiseWorker() {
    if (!navigator.serviceWorker) {
        return;
    }

    const workbox = new Workbox('/service-worker.js');

    let registration: ServiceWorkerRegistration;

    async function handleUpdate(event: WorkboxLifecycleWaitingEvent) {
        try {
            await componentsController.confirm({
                message: 'An update to Ocula has been installed. Would you like to reload now and complete the update?',
                confirmLabel: 'Yes, update',
                cancelLabel: 'Later'
            });

            workbox.addEventListener('controlling', () => {
                localStorage.removeItem(STORAGE_KEYS.data);
                window.location.reload();
            });
    
            if (registration && registration.waiting) {
                messageSW(registration.waiting, {  
                    type: 'SKIP_WAITING'
                });
            }
        } catch {
            // do nothing
        }
    }

    workbox.addEventListener('waiting', handleUpdate);
    workbox.addEventListener('externalwaiting', handleUpdate);

    registration = await workbox.register();
}