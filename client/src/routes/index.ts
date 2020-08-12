import Error from './error.vue';
import Weather from './weather.vue';

import error from './error/index';
import weather from './weather/index';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        path: '/',
        component: Weather,
        children: weather
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