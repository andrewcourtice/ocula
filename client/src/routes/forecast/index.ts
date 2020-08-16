import ROUTES from '../../constants/routes';

import Index from './index.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: '',
        name: ROUTES.forecast.index,
        component: Index
    }
] as RouteRecordRaw[];