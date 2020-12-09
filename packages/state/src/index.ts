import {
    reactive,
    readonly,
    computed,
    Plugin
} from 'vue';

import {
    CustomInspectorNode,
    setupDevtoolsPlugin
} from '@vue/devtools-api';

import {
    typeIsPlainObject
} from '@ocula/utilities';

import type {
    Getter,
    Mutation,
    IStore
} from './types';

type StoreAccessor = () => object;

const stores = new Map<string, StoreAccessor>();

let devtoolsEnabled = process.env.NODE_ENV === 'development';

function logMutation(name: string, state: any, isError: boolean = false): void {
    if (!devtoolsEnabled) {
        return;
    }

    console[isError ? 'warn' : 'info'](name, 'mutation');
}

function mapStore(state: object): CustomInspectorNode[] {
    return Object.keys(state).reduce((output, key) => {
        const value = state[key];

        if (!typeIsPlainObject(value)) {
            return output;
        }

        return [].concat(output, {
            id: key,
            label: key,
            children: mapStore(value)
        });
    }, [] as CustomInspectorNode[]);
}

export const plugin = {

    install(app) {
        setupDevtoolsPlugin({
            app,
            id: 'state',
            label: 'State'
        }, api => {
            api.addInspector({
                id: 'state',
                label: 'State'
            });

            api.on.getInspectorTree((payload, context) => {
                if (payload.app !== app || payload.inspectorId !== 'state') {
                    return;
                }

                const nodes: CustomInspectorNode[] = [];

                stores.forEach((accessor, name) => {
                    const state = accessor();
                   
                    nodes.push({
                        id: name,
                        label: name,
                        children: mapStore(state)
                    });
                });

                payload.rootNodes = nodes;
            });
        });
    }

} as Plugin;

export function enableDevtools(value: boolean = true): void {
    devtoolsEnabled = value;
}

export default function createStore<T extends object = any>(name: string, data: T): IStore<T> {
    const write = reactive(data);
    const state = readonly(write);

    function getter<U>(getter: Getter<T, U>) {
        return computed(() => getter(state as T));
    }
    
    function mutate(name: string, mutation: Mutation<T>): void {
        const mutationName = name || mutation.name || 'unknown';

        try {
            mutation(write as T);
        } catch (error) {
            logMutation(mutationName, write);
        }

        logMutation(mutationName, write);
    }

    function destroy() {
        stores.delete(name);
    }

    stores.set(name, () => state);
    
    return {
        state: state as T,
        getter,
        mutate,
        destroy
    };
}