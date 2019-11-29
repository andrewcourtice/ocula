export default async function initialiseWorker() {
    if (!navigator.serviceWorker) {
        return;
    }

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/worker' + '.js');
    });
}