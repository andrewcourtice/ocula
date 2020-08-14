import ROUTES from '../../constants/routes';

import Index from './index.vue';
import Themes from './themes.vue';
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
        path: 'themes',
        name: ROUTES.settings.themes,
        component: Themes
    },
    {
        path: 'about',
        name: ROUTES.settings.about,
        component: About
    }
] as RouteRecordRaw[];