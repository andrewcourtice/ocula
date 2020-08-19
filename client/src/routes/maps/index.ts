import ROUTES from '../../constants/routes';

import Index from './index.vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: ':type?',
        name: ROUTES.maps.index,
        props: true,
        component: Index
    }
];