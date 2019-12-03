import eventEmitter from '../../packages/event-emitter/index';

export default function(event: string, method: string = 'open') {

    return {

        created() {
            eventEmitter.on(event, this[method]);
        },
        
        beforeDestroy() {
            eventEmitter.off(event, this[method]);
        }

    };

}