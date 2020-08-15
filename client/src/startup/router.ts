import ROUTES from '../constants/routes';

import routes from '../routes/index';

import setThemeMeta from '../helpers/set-theme-meta';

import {
    createRouter,
    createWebHistory
} from 'vue-router';

import type {
    App
} from 'vue';

import {
    theme
} from '../store';

declare function gtag(key: string, trackingId: string, meta: any): void;

export default function initialiseRouter(application: App) {
    const router = createRouter({
        history: createWebHistory(),
        routes
    });

    router.beforeEach((to, from, next) => {
        if (!theme.value) {
            return next();
        }

        const isForecast = to.matched.some(({ name }) => name === ROUTES.forecast.index);

        let {
            colour
        } = theme.value.core;

        if (isForecast) {
            colour = theme.value.weather.colour;
        }

        setThemeMeta(colour);

        next();
    });

    if (gtag) {
        router.afterEach(to => gtag('config', process.env.GA_TRACKING_ID, {
            'page_path': to.path
        }));
    }

    application.use(router);

    return router;
}