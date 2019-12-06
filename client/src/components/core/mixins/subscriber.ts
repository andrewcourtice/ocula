import eventEmitter from '@ocula/event-emitter';

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