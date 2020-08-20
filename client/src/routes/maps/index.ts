import ROUTES from '../../constants/routes';

import {
    defineAsyncComponent
} from 'vue';

import type {
    RouteRecordRaw
} from '@ocula/router';

export default [
    {
        path: ':type?',
        name: ROUTES.maps.index,
        props: true,
        component: defineAsyncComponent(() => import(/* webpackChunkName: 'maps' */ './index.vue'))
    }
];