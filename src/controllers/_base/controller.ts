import {
    store
} from '../../startup/state';

function path(...segments: Array<string | undefined>): string {
    return segments.filter(segment => !!segment).join('/');
}

export default class Controller {

    private module?: string;

    constructor(module?: string) {
        this.module = module;
    }

    get state() {
        return this.module ? store.state[this.module] : store.state;
    }

    getter(name: string) {
        return store.getters[path(this.module, name)];
    }

    commit(name: string, payload: any) {
        return store.commit(path(this.module, name), payload);
    }

    dispatch(name: string, payload: object = {}) {
        return store.dispatch(path(this.module, name), payload);
    }

}