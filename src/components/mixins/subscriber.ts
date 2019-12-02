import eventEmitter from '../../packages/event-emitter/index';

export default function(event: string, callback: (vm: any) => Function) {

    let listener;

    return {

        beforeMount() {
            listener = eventEmitter.on(event, (...args) => callback(this)(...args));
            console.log(eventEmitter);
        },

        beforeDestroy() {
            listener && listener.dispose();
        }

    };

}