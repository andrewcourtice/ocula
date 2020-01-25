import Index from './index.vue';
import Forecast from './forecast.vue';
import Radar from './radar.vue';

export default [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '',
                component: Forecast
            }
        ]
    },
    {
        path: '/weather',
        component: Index,
        children: [
            {
                path: 'forecast',
                component: Forecast
            },
            {
                path: 'radar',
                component: Radar
            }
        ]
    }
];