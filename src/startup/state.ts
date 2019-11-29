import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import state from '../state/index';

export let store: Store<any>;

export default function initialiseState() {
    Vue.use(Vuex);

    store = new Vuex.Store(state);
    
    return store;
}