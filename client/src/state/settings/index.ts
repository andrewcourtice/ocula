import MUTATIONS from './mutations';
import SETTINGS from '../../constants/settings';
import STORAGE_KEYS from '../../constants/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

function getSettings() {
    let settings = localStorage.getItem(STORAGE_KEYS.settings);

    if (!settings) {
        return SETTINGS;
    }

    settings = JSON.parse(settings);

    return objectMerge(SETTINGS, settings);
}

export default {

    namespaced: true,

    state: {
        settings: getSettings()
    },

    mutations: {

        [MUTATIONS.updateSettings](state, payload) {
            const settings = objectMerge(state.settings, payload);

            localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));

            state.settings = settings;
        }      

    }

}