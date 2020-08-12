import ROUTES from '../../constants/routes';

import Index from './index.vue';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        path: '',
        name: ROUTES.weather.index,
        component: Index
    }
] as RouteRecordRaw[];