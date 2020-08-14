import {
    onBeforeMount,
    onUnmounted
} from 'vue';

type Timer = 'interval' | 'timeout';

interface ITimerApplication {
    set(handler: TimerHandler, timeout: number): number;
    clear(handle: number): void;
}

const TIMER = {
    interval: {
        set: window.setInterval,
        clear: window.clearInterval
    },
    timeout: {
        set: window.setTimeout,
        clear: window.clearTimeout
    }
} as Record<Timer, ITimerApplication>

export default function useTimer(handler: TimerHandler, timeout: number, timer: Timer = 'interval'): number {
    let handle;

    const timerApplication = TIMER[timer];

    onBeforeMount(() => handle = timerApplication.set.call(window, handler, timeout));
    onUnmounted(() => timerApplication.clear.call(window, handle));

    return handle
}