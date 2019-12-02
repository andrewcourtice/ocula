import IAction from './action';

export default interface IStore<S = any> {
    devtools?: boolean,
    state?: S,
    getters?: {
        [key: string]: <T = unknown>(state: S, getters: object) => T
    },
    mutations?: {
        [key: string]: <T = unknown>(state: S, payload: T) => void
    },
    actions?: {
        [key: string]: <I = unknown, O = unknown>(action: IAction<S>, payload: I) => Promise<O>
    }
};