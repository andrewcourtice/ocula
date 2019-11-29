import {
    Store
} from 'vuex';

export default function initialiseStorage(store: Store<any>) {
    store.watch(state => state.settings, value => {
        console.log(value);
        localStorage.setItem('ocula', JSON.stringify(value));
    }, { deep: true, immediate: true });
}