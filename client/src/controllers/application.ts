import EVENTS from '../constants/events';

import Controller from './_base/controller';

import eventEmitter from '@ocula/event-emitter';

import {
    functionDebounce
} from '@ocula/utilities';

const resize = functionDebounce(event => eventEmitter.emit(EVENTS.application.resized, event), 300);

function visibilityChanged() {
    if (!document.hidden) {
        eventEmitter.emit(EVENTS.application.visible);
    }     
}

window.addEventListener('resize', resize)
document.addEventListener('visibilitychange', visibilityChanged);

export class ApplicationController extends Controller {

    get updateReady() {
        return this.state.updateReady;
    }

    openOptionsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.options);
    }

}

export default new ApplicationController();