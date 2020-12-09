import ROUTES from '../../../constants/core/routes';

import Display from './display.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: 'maps/display',
        name: ROUTES.settings.maps.display,
        component: Display
    }
] as RouteRecordRaw[];