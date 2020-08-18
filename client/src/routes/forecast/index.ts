import ROUTES from '../../constants/routes';

import type {
    RouteRecordRaw
} from '@ocula/router';

import {
    defineAsyncComponent
} from 'vue';

export default [
    {
        path: '',
        name: ROUTES.forecast.index,
        component: defineAsyncComponent(() => import(/* webpackChunkName: 'forecast' */ './index.vue'))
    }
] as RouteRecordRaw[];