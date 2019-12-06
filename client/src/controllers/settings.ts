import MODULES from '../constants/modules';
import MUTATIONS from '../state/settings/mutations';

import Controller from './_base/controller';

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

}

export default new SettingsController();