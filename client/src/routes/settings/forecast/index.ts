import ROUTES from '../../../constants/core/routes';

import Locations from './locations.vue';
import Sections from './sections.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: 'forecast/locations',
        name: ROUTES.settings.forecast.locations,
        component: Locations
    },
    {
        path: 'forecast/sections',
        name: ROUTES.settings.forecast.sections,
        component: Sections
    }
] as RouteRecordRaw[];