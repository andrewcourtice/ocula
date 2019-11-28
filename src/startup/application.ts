import Vue from 'vue';

import App from '../app.vue';

export default function initialiseApplication() {
    return new Vue({
        el: '#app',
        render(createElement) {
            return createElement(App);
        }
    });
}