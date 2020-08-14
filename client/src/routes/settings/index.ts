import ROUTES from '../../constants/routes';

import Index from './index.vue';
import About from './about.vue';

import type {
    RouteRecordRaw
} from 'vue-router';

export default [
    {
        path: '',
        name: ROUTES.settings.index,
        component: Index
    },
    {
        path: 'about',
        name: ROUTES.settings.about,
        component: About
    }
] as RouteRecordRaw[];