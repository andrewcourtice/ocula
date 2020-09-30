import './vendor';

import initialiseComponents from './components';
import initialiseRouter from './router';
import initialiseApplication from './application';
import initialiseState from './state';
import initialiseLogging from './logging';
import initialiseWorker from './worker';

export default async function start() {
    const application = initialiseApplication();

    const router = initialiseRouter(application);
    
    initialiseState(application);
    initialiseComponents(application);
    
    initialiseWorker();
    initialiseLogging();

    await router.isReady();

    application.mount('body');

    return {
        router,
        application
    };
}