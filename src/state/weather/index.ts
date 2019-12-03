import ACTIONS from './actions';
import MUTATIONS from './mutations';

import {
    getForecast,
    getOutlook
} from '../../services/weather';

export default {

    namespaced: true,

    state: {
        outlook: {},
        forecast: {},
        alerts: []
    },

    mutations: {

        [MUTATIONS.setOutlook](state, payload: any) {
            state.outlook = payload;
        },

        [MUTATIONS.setForecast](state, payload: any) {
            state.forecast = payload;
        }

    },

    actions: {

        async [ACTIONS.loadOutlook]({ commit }, payload) {
            const {
                locationId
            } = payload;

            const outlook = await getOutlook(locationId);

            commit(MUTATIONS.setOutlook, outlook);
        },

        async [ACTIONS.loadForecast]({ commit }, payload) {
            const {
                locationId
            } = payload;

            const forecast = await getForecast(locationId);

            commit(MUTATIONS.setForecast, forecast);
        }

    }

}