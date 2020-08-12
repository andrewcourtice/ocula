import './vendor';

import initialiseComponents from './components';
import initialiseRouter from './router';
import initialiseApplication from './application';
import initialiseLogging from './logging';
import initialiseWorker from './worker';

export default async function start() {
    const application = initialiseApplication();

    const router = initialiseRouter(application);
    
    initialiseComponents(application);
    
    initialiseWorker();
    initialiseLogging();

    await router.isReady();

    application.mount('#app');

    return {
        router,
        application
    };
}