<template>
    <div class="accordion">
        <slot :open="open" :close="close" :toggle="toggle"></slot>
    </div>
</template>

<script lang="ts">
import EVENTS from './constants/events';

import {
    defineComponent,
    provide,
    onBeforeUnmount
} from 'vue';

import {
    EventEmitter
} from '@ocula/event-emitter';

export default defineComponent({

    props: {

        multiple: {
            type: Boolean,
            default: false
        }

    },
   
    setup(props, { emit }) {
        const eventEmitter = new EventEmitter();

        const listener = eventEmitter.on(EVENTS.paneOpened, (id: string | number) => {
            if (!props.multiple) {
                eventEmitter.emit(EVENTS.closeExcept, id);
            }

            emit(EVENTS.paneOpened, id);
        });

        function open(id: string | number) {
            eventEmitter.emit(EVENTS.openPane, id);
        }

        function close(id: string | number) {
            eventEmitter.emit(EVENTS.openPane, id);
        }

        function toggle(id: string | number) {
            eventEmitter.emit(EVENTS.togglePane, id);
        }

        provide('accordion', eventEmitter);
        onBeforeUnmount(() => listener.dispose());

        return {
            open,
            close,
            toggle
        };
    }

});
</script>