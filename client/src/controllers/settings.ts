import MUTATIONS from '../state/mutations';

import Controller from './_base/controller';

export class SettingsController extends Controller {

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