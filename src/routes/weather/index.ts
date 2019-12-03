import Index from './index.vue';
import Outlook from './outlook.vue';

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
            }
        ]
    }
];