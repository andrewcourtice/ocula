import EVENTS from '../constants/events';

import Controller from './_base/controller';

import eventEmitter from '../packages/event-emitter/index';

export class ApplicationController extends Controller {

    openOptionsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.options);
    }

}

export default new ApplicationController();