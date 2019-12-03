import {
    Workbox
} from 'workbox-window';

export default async function initialiseWorker() {
    if (!navigator.serviceWorker) {
        return;
    }

    window.addEventListener('load', () => {
        const workbox = new Workbox('/worker' + '.js');

        workbox.addEventListener('installed', event => {
            if (!event.isUpdate) {
                return;
            }

            const response = window.confirm('An update to Ocula is available. Click OK to reload and update.');

            if (response) {
                window.location.reload();
            }
        });

        workbox.register();
    });
}