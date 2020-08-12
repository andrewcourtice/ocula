import Index from './index.vue';
import NotFound from './not-found.vue';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        path: '',
        component: Index,
    },
    {
        path: 'not-found',
        component: NotFound,
    }
] as RouteRecordRaw[];