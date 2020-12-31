import Forecast from './forecast.vue';
import Maps from './maps.vue';
import Settings from './settings.vue';
import Error from './error.vue';

import forecast from './forecast';
import maps from './maps';
import settings from './settings';
import error from './error';

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
        path: '/maps',
        component: Maps,
        children: maps
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