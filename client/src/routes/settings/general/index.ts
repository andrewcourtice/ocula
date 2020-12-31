import ROUTES from '../../../constants/core/routes';

import Theme from './theme.vue';
import About from './about.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: 'general/theme',
        name: ROUTES.settings.general.theme,
        component: Theme
    },
    {
        path: 'general/about',
        name: ROUTES.settings.general.about,
        component: About
    }
] as RouteRecordRaw[];