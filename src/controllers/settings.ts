import EVENTS from '../constants/events';
import MODULES from '../constants/modules';
import MUTATIONS from '../state/settings/mutations';

import Controller from './_base/controller';

import eventEmitter from '../packages/event-emitter/index';

export class SettingsController extends Controller {

    constructor() {
        super(MODULES.settings);
    }

    get location() {
        return this.state.settings.location;
    }

    set location(value) {
        this.commit(MUTATIONS.updateSettings, {
            location: value
        });
    }

    openSettingsSidebar() {
        eventEmitter.emit(EVENTS.sidebars.settings);
    }

}

export default new SettingsController();