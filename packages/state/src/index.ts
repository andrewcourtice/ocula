import {
    reactive,
    readonly,
    computed
} from 'vue';

import type {
    ComputedRef
} from '@vue/reactivity'

type Getter<T, U> = (state: T) => U;
type Mutation<T> = (state: T) => void;

interface IStore<T> {
    state: T;
    getter<U>(getter: Getter<T, U>): ComputedRef<U>;
    mutate(mutation: Mutation<T>): void;
};

export default function createStore<T extends object = any>(data: T): IStore<T> {
    const write = reactive(data);
    const state = readonly(write);
    
    const getter = <U>(getter: Getter<T, U>) => computed(() => getter(state as T));
    const mutate = (mutation: Mutation<T>) => mutation(write as T)
    
    return {
        state: state as T,
        getter,
        mutate
    };
}