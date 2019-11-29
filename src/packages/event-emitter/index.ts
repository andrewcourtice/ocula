interface IListener {
    dispose(): void
}

export class EventEmitter {

    private listeners: {
        [key: string]: Function[]
    };

    constructor() {
        this.listeners = {};
    }

    on(event: string, handler: Function): IListener {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(handler);

        return {
            dispose: () => this.off(event, handler)
        };
    }

    off(event: string, handler: Function): void {
        const listeners = this.listeners[event];

        if (!listeners) {
            return;
        }

        this.listeners[event] = listeners.filter(listener => listener !== handler);
    }

    once(event: string, handler: Function): IListener {
        const callback = (...args) => {
            handler(...args);
            this.off(event, callback);
        };

        return this.on(event, callback);
    }

    emit(event: string, ...args) {
        const handlers = this.listeners[event];

        if (!handlers) {
            return;
        }

        handlers.forEach(handler => handler(...args));
    }

}

export default new EventEmitter();