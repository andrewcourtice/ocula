import MUTATIONS from './mutations';
import SETTINGS from '../../constants/settings';
import STORAGE_KEYS from '../../constants/storage-keys';

function getSettings() {
    const settings = localStorage.getItem(STORAGE_KEYS.settings);

    if (!settings) {
        return SETTINGS;
    }

    return JSON.parse(settings);
}

export default {

    namespaced: true,

    state: {
        settings: getSettings()
    },

    mutations: {

        [MUTATIONS.updateSettings](state, payload) {
            const settings = {
                ...state.settings,
                ...payload
            };

            localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));

            state.settings = settings;
        }      

    }

}