import Index from './index.vue';
import NotFound from './not-found.vue';

export default [
    {
        path: '/error',
        component: Index,
        children: [
            {
                path: 'not-found',
                component: NotFound
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/error/not-found'
    }
]