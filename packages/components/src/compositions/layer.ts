import eventEmitter from '../event-emitter/index';

import {
    ref,
    onBeforeMount,
    onUnmounted
} from 'vue';

import type {
    IPromisePayload
} from '../interfaces';

import type {
    IListener
} from '@ocula/event-emitter';

import type {
    SetupContext
} from '@vue/runtime-core';

export default function(id: string, { emit }: SetupContext) {
    const isOpen = ref(false);

    let promise: IPromisePayload;

    function open(payload: any, promisePayload: IPromisePayload) {
        emit('open', payload);

        promise = promisePayload;
        isOpen.value = true;
    }
    
    function close(payload: any) {
        emit('close', payload);

        if (promise) {
            promise.resolve(payload);
            promise = null;
        }
        
        isOpen.value = false;
    }

    function cancel(payload: any) {
        emit('cancel', payload);

        if (promise) {
            promise.reject(payload);
            promise = null;
        }

        isOpen.value = false;
    }

    let listeners = [] as IListener[];

    onBeforeMount(() => {
        listeners = [
            eventEmitter.on(`open:${id}`, open),
            eventEmitter.on(`close:${id}`, close),
        ];
    });

    onUnmounted(() => {
        listeners.forEach(({ dispose }) => dispose());

        if (promise) {
            promise.reject();
        }
    });

    return {
        isOpen,
        open,
        close,
        cancel
    };
}