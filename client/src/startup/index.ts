import './vendor';

import initialiseComponents from './components';
import initialiseState from './state';
import initialiseRouter from './router';
import initialiseApplication from './application';
import initialiseLogging from './logging';
import initialiseWorker from './worker';

export default async function start() {
    const application = initialiseApplication();

    const store = initialiseState(application);
    const router = initialiseRouter(application);
    
    initialiseComponents(application);
    initialiseWorker(store);
    
    initialiseLogging();

    await router.isReady();

    application.mount('#app');

    return {
        router,
        store,
        application
    };
}