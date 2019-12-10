import Index from './index.vue';
import Outlook from './outlook.vue';
import Trends from './trends.vue';
import Forecast from './forecast.vue';

export default [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '',
                component: Outlook
            }
        ]
    },
    {
        path: '/weather',
        component: Index,
        children: [
            {
                path: 'outlook',
                component: Outlook
            },
            {
                path: 'trends',
                component: Trends
            },
            {
                path: 'forecast',
                component: Forecast
            }
        ]
    }
];