import Index from './index.vue';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        name: 'weather',
        path: '',
        alias: 'weather',
        component: Index
    }
] as RouteRecordRaw[];