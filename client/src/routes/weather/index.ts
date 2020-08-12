import ROUTES from '../../constants/routes';

import Index from './index.vue';
import Setup from './setup.vue';

import type {
    RouteRecordRaw
} from 'vue-router';

import {
    state
} from '../../store';

export default [
    {
        path: '',
        name: ROUTES.weather.index,
        component: Index,
        beforeEnter(to, from, next) {
            if (!state.settings.location) {
                return next({
                    name: ROUTES.weather.setup
                });
            }

            next();
        }
    },
    {
        path: 'setup',
        name: ROUTES.weather.setup,
        component: Setup,
        beforeEnter(to, from, next) {
            if (state.settings.location) {
                return next({
                    name: ROUTES.weather.index
                });
            }

            next();
        }
    }
] as RouteRecordRaw[];