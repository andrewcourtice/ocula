import state from '../state/index';

import {
    createStore,
    Store
} from 'vuex';

import type {
    App
} from 'vue';

export let store: Store<any>;

export default function initialiseState(application: App) {
    store = createStore(state);
    
    application.use(store);

    return store;
}