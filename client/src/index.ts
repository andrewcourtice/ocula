import Vue from 'vue';
import App from './app.vue';

export default new Vue({
    el: '#app',
    render(createElement) {
        return createElement(App);
    }
});