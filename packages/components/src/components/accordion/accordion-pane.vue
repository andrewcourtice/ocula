<template>
    <transition-box-resize class="accordion-pane">
        <div class="accordion-pane__header" v-if="$slots.header || label" @click="toggle">
            <slot name="header">{{ label }}</slot>
        </div>
        <div class="accordion-pane__body" v-if="isOpen">
            <slot></slot>
        </div>
    </transition-box-resize>
</template>

<script lang="ts">
import EVENTS from './constants/events';

import {
    defineComponent,
    inject,
    ref,
    onBeforeUnmount
} from 'vue';

import {
    stringUniqueId
} from '@ocula/utilities';

import {
    EventEmitter
} from '@ocula/event-emitter';

export default defineComponent({

    props: {

        id: {
            type: String,
            default: () => stringUniqueId()
        },

        label: {
            type: String
        }

    },
    
    setup(props, { emit }) {
        const eventEmitter = inject<EventEmitter>('accordion');

        const isOpen = ref(false);

        function open() {
            isOpen.value = true;

            emit('open');
            eventEmitter.emit(EVENTS.paneOpened, props.id);
        }

        function close() {
            isOpen.value = false;

            emit('close');
            eventEmitter.emit(EVENTS.paneClosed, props.id);
        }

        function toggle() {
            (!!isOpen.value ? close : open)();
        }

        function closeExcept(id: string) {
            if (id !== props.id) {
                close();
            }
        }

        const listeners = [
            eventEmitter.on(EVENTS.closeAll, close),
            eventEmitter.on(EVENTS.closeExcept, closeExcept),
            eventEmitter.on(EVENTS.openPane, id => id === props.id && open()),
            eventEmitter.on(EVENTS.closePane, id => id === props.id && close()),
            eventEmitter.on(EVENTS.togglePane, id => id === props.id && toggle())
        ];

        onBeforeUnmount(() => listeners.forEach(({ dispose }) => dispose()));

        return {
            isOpen,
            toggle
        };
    }

});
</script>