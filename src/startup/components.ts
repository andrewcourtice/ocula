import Vue from 'vue';

import components from '../components/core/index';

export default function initialiseComponents() {
    Object.keys(components).forEach(key => Vue.component(key, components[key]));
}