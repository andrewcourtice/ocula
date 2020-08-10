import routes from '../routes/index';

import {
    createRouter,
    createWebHistory
} from 'vue-router';

import type {
    App
} from 'vue';

export default function initialiseRouter(application: App) {
    const router = createRouter({
        history: createWebHistory(),
        routes
    });

    if (gtag) {
        router.afterEach(to => gtag('config', process.env.GA_TRACKING_ID, {
            'page_path': to.path
        }));
    }

    application.use(router);

    return router;
}