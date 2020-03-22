import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from '../routes/index';

export default function initialiseRouter() {
    Vue.use(VueRouter);

    const router = new VueRouter({
        mode: 'history',
        routes
    });

    if (gtag) {
        router.afterEach(to => gtag('config', process.env.GA_TRACKING_ID, {
            'page_path': to.path
        }));
    }

    return router;
}