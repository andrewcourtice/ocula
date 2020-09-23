import MODALS from '../constants/modals';

import eventEmitter from '../event-emitter/index';

import type {
    IConfirmModalPayload
} from '../interfaces';

class ComponentsController {

    public async open<T = any>(id: string, payload?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            eventEmitter.emit(`open:${id}`, payload, { resolve, reject });
        });
    }

    public close(id: string, payload?: any): void {
        eventEmitter.emit(`close:${id}`, payload);
    }

    public async confirm(payload: IConfirmModalPayload): Promise<void> {
        return this.open(MODALS.confirm, payload);
    }

}

export default new ComponentsController();