import ROUTES from '../constants/routes';

import routes from '../routes/index';

import setThemeMeta from '../helpers/set-theme-meta';

import Router, {
    router
} from '@ocula/router';

import type {
    App
} from 'vue';

import {
    theme
} from '../store';

declare function gtag(key: string, trackingId: string, meta: any): void;

export default function initialiseRouter(application: App) {
    application.use(Router, routes);

    router.beforeEach((to, from, next) => {
        if (!theme.value) {
            return next();
        }

        const isForecast = to.matched.some(({ name }) => name === ROUTES.forecast.index);

        let {
            colour
        } = theme.value.core;

        if (isForecast) {
            colour = theme.value.weather.colour || colour;
        }

        setThemeMeta(colour);

        next();
    });

    if (gtag) {
        router.afterEach(to => gtag('config', process.env.GA_TRACKING_ID, {
            'page_path': to.path
        }));
    }

    return router;
}