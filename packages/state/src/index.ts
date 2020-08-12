import {
    reactive,
    readonly,
    computed
} from 'vue';

import type {
    Getter,
    Mutation,
    IStore
} from './interfaces/index';

let devtoolsEnabled = process.env.NODE_ENV === 'development';

function logMutation(state: any, name: string, isError: boolean = false): void {
    if (!devtoolsEnabled) {
        return;
    }

    console[isError ? 'warn' : 'info'](name, 'mutation');
}

export function enableDevtools(value: boolean = true): void {
    devtoolsEnabled = value;
}

export default function createStore<T extends object = any>(data: T): IStore<T> {
    const write = reactive(data);
    const state = readonly(write);

    function getter<U>(getter: Getter<T, U>) {
        return computed(() => getter(state as T));
    }
    
    function mutate(mutation: Mutation<T>, name?: string) {
        const mutationName = name || mutation.name || 'unknown';

        try {
            mutation(write as T);
        } catch (error) {
            logMutation(write, mutationName);
        }

        logMutation(write, mutationName);
    }
    
    return {
        state: state as T,
        getter,
        mutate
    };
}