import ROUTES from '../../constants/routes';

import Index from './index.vue';
import NotFound from './not-found.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: '',
        name: ROUTES.error.index,
        component: Index,
    },
    {
        path: 'not-found',
        name: ROUTES.error.notFound,
        component: NotFound,
    }
] as RouteRecordRaw[];