export default async function initialiseWorker() {
    if (!navigator.serviceWorker) {
        return;
    }

    return navigator.serviceWorker.register('worker' + '.js');
}