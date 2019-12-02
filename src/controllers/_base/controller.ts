import {
    store
} from '../../startup/state';

export default class Controller {

    get state() {
        return store.state;
    }

    getter(name: string) {
        return store.getters[name];
    }

    dispatch(name: string, payload: object = {}) {
        return store.dispatch(name, payload);
    }

}