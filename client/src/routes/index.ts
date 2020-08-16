import Forecast from './forecast.vue';
import Radar from './radar.vue';
import Settings from './settings.vue';
import Error from './error.vue';

import forecast from './forecast/index';
import radar from './radar/index';
import settings from './settings/index';
import error from './error/index';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: '/forecast',
        alias: '/',
        component: Forecast,
        children: forecast
    },
    {
        path: '/radar',
        component: Radar,
        children: radar
    },
    {
        path: '/settings',
        component: Settings,
        children: settings
    },
    {
        path: '/error',
        component: Error,
        children: error
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/error/not-found'
    }
] as RouteRecordRaw[];