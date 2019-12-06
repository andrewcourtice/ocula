import MUTATIONS from './mutations';
import MODULES from '../constants/modules';

import settings from './settings/index';
import weather from './weather/index';

export default {
    devtools: true,

    state: {
        updateReady: false
    },

    mutations: {

        [MUTATIONS.setUpdateReady](state) {
            state.updateReady = true;
        }

    },

    modules: {
        [MODULES.settings]: settings,
        [MODULES.weather]: weather
    }
};