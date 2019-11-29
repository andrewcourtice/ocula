import {
    store
} from '../../startup/state';

export default class Controller {

    get state() {
        return store.state;
    }

    dispatch(name: string, payload: object = {}) {
        return store.dispatch(name, payload);
    }

}