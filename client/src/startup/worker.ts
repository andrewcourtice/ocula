import {
    Workbox,
    messageSW
} from 'workbox-window';

import {
    clearData
} from '../store/helpers/storage';

import {
    componentsController
} from '@ocula/components';

import {
    envIsDevelopment
} from '@ocula/utilities';

import type {
    WorkboxLifecycleWaitingEvent
} from 'workbox-window/utils/WorkboxEvent';

export default async function initialiseWorker() {
    if (envIsDevelopment || !navigator.serviceWorker) {
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
                clearData();
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