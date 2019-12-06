import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from '../routes/index';

export default function initialiseRouter() {
    Vue.use(VueRouter);

    return new VueRouter({
        mode: 'history',
        routes
    });
}