import {
    store
} from '../../startup/state';

export default class Controller {

    private module: string;

    constructor(module) {
        this.module = module;
    }

    get state() {
        return store.state[this.module];
    }

    getter(name: string) {
        return store.getters[`${this.module}/${name}`];
    }

    commit(name: string, payload: any) {
        return store.commit(`${this.module}/${name}`, payload);
    }

    dispatch(name: string, payload: object = {}) {
        return store.dispatch(`${this.module}/${name}`, payload);
    }

}