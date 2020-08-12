import eventEmitter from '../event-emitter/index';

class ComponentsController {

    public async open<T = any>(id: string, payload?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            eventEmitter.emit(`open:${id}`, payload, { resolve, reject });
        });
    }

    public close(id: string, payload?: any): void {
        eventEmitter.emit(`close:${id}`, payload);
    }

}

export default new ComponentsController();