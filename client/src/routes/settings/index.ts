import ROUTES from '../../constants/core/routes';

import Index from './index.vue';

import forecast from './forecast';
import general from './general';
import maps from './maps';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: '',
        name: ROUTES.settings.index,
        component: Index
    },

    ...forecast,
    ...maps,
    ...general
    
] as RouteRecordRaw[];