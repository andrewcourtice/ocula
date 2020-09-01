import eventEmitter from '@ocula/event-emitter';

import {
    onBeforeMount,
    onUnmounted
} from 'vue';

export default function(event: string, callback: Function): void {
    onBeforeMount(() => eventEmitter.on(event, callback));
    onUnmounted(() => eventEmitter.off(event, callback));
}