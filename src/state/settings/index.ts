import MUTATIONS from './mutations';

import SETTINGS from '../../constants/settings';

function getSettings() {
    const settings = localStorage.getItem('ocula');

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

            localStorage.setItem('ocula', JSON.stringify(settings));

            state.settings = settings;
        }      

    }

}