import './vendor';
import './styles';

import initialiseState from './state';
import initialiseRouter from './router';
import initialiseStorage from './storage';
import initialiseApplication from './application';
import initialiseWorker from './worker';

export default function start() {
    const store = initialiseState();
    const router = initialiseRouter();
    const application = initialiseApplication(router, store);

    initialiseStorage(store);
    initialiseWorker();

    return {
        router,
        store,
        application
    };
}