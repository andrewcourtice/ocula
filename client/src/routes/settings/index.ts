import ROUTES from '../../constants/core/routes';

import Index from './index.vue';
import Locations from './locations.vue';
import Sections from './sections.vue';
import Themes from './themes.vue';
import About from './about.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: '',
        name: ROUTES.settings.index,
        component: Index
    },
    {
        path: 'locations',
        name: ROUTES.settings.locations,
        component: Locations
    },
    {
        path: 'sections',
        name: ROUTES.settings.sections,
        component: Sections
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