import EVENTS from '../constants/events';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        eventEmitter.emit(EVENTS.application.visible);
    }     
});

export class ApplicationController extends Controller {

    get updateReady() {
        return this.state.updateReady;
    }

    openOptionsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.options);
    }

}

export default new ApplicationController();