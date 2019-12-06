import Vue from 'vue';

import App from '../app.vue';

export default function initialiseApplication(router, store) {
    Vue.config.devtools = true;
    
    return new Vue({
        el: '#app',
        router,
        store,
        render(createElement) {
            return createElement(App);
        }
    });
}