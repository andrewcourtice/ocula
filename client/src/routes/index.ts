import Error from './error.vue';
import Weather from './weather.vue';
import Settings from './settings.vue';
import About from './about.vue';

import error from './error/index';
import weather from './weather/index';
import settings from './settings/index';
import about from './about/index';

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
        path: '/settings',
        component: Settings,
        children: settings
    },
    {
        path: '/about',
        component: About,
        children: about
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