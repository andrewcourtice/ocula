import {
    createRouter,
    createWebHistory
} from 'vue-router';

import type {
    App
} from 'vue';

import type {
    Router,
    RouteRecordRaw
} from 'vue-router';

export type {
    RouteRecord,
    RouteRecordRaw
} from 'vue-router';

export let router: Router;

export default {

    install(app: App, routes: RouteRecordRaw[]) {
        router = createRouter({
            history: createWebHistory(),
            routes
        });

        app.use(router);
    }

};