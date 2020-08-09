import GLOBAL from '../constants/global';
import LOCATIONS from '../constants/locations';
import STORAGE_KEYS from '../constants/storage-keys';
import GETTERS from './getters';
import MUTATIONS from './mutations';
import ACTIONS from './actions';

import UNITS from '../constants/units';
import FORMATS from '../constants/formats';

import formatData from '../helpers/format-data';

import {
    getLocation
} from '../services/location';

import {
    getForecast
} from '../services/weather';

import {
    getSettings,
    getData
} from './helpers/storage';

import {
    getPosition
} from './helpers/location';

import {
    formatDataPoint
} from './helpers/data';

import {
    IState
} from '../interfaces/state';

function getState(): IState {
    const settings = getSettings();

    const {
        location,
        forecast,
        lastUpdated
    } = getData();

    return {
        settings,
        location,
        forecast,
        lastUpdated,

        loading: false,
        updateReady: false,
    };
}

export default {
    devtools: true,

    state: getState(),

    getters: {

        [GETTERS.data](state) {
            const {
                units
            } = state.settings;

            const format = FORMATS[units] || FORMATS[UNITS.metric];

            return formatData(state.forecast, format);
        }

    },

    mutations: {

        [MUTATIONS.setUpdateReady](state) {
            state.updateReady = true;
        },

        [MUTATIONS.setLoading](state, payload) {
            state.loading = !!payload;
        },

        [MUTATIONS.setLastUpdated](state) {
            state.lastUpdated = new Date();
        },

        [MUTATIONS.clearLastUpdated](state) {
            state.lastUpdated = null;
        },

        [MUTATIONS.setLocation](state, payload) {
            state.location = payload;
        },

        [MUTATIONS.setForecast](state, payload) {
            state.forecast = payload;
        },
        
        [MUTATIONS.updateData](state) {
            const {
                location,
                forecast,
                lastUpdated
            } = state;
        
            localStorage.setItem(STORAGE_KEYS.data, JSON.stringify({
                location,
                forecast,
                lastUpdated
            }));
        },

        [MUTATIONS.updateSettings](state, payload) {
            const settings = {
                ...state.settings,
                ...payload
            };

            localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));

            state.settings = settings;
        } 

    },

    actions: {

        async [ACTIONS.loadLocation]({ state, commit }) {
            const lastUpdated = state.lastUpdated;

            if (lastUpdated && Date.now() - lastUpdated < GLOBAL.updateThreshold) {
                return;
            }

            const {
                location
            } = state.settings;

            let latitude,
                longitude;

            if (location === LOCATIONS.current) {
                ({
                    latitude,
                    longitude
                } = await getPosition());
            } else {
                ({
                    latitude,
                    longitude
                } = location);
            }

            if (!latitude || !longitude) {
                return;
            }

            const response = await getLocation(latitude, longitude);

            commit(MUTATIONS.setLocation, response);

            return response;
        },

        async [ACTIONS.loadForecast]({ state, commit }, payload) {
            const {
                latitude,
                longitude
            } = payload;

            const {
                units
            } = state.settings;

            const forecast = await getForecast(latitude, longitude, units);

            commit(MUTATIONS.setForecast, forecast);

            return forecast;
        },

        async [ACTIONS.load]({ commit, dispatch }) {
            commit(MUTATIONS.setLoading, true);
            
            try {
                const {
                    latitude,
                    longitude
                } = await dispatch(ACTIONS.loadLocation);
                
                await dispatch(ACTIONS.loadForecast, {
                    latitude,
                    longitude
                });

                commit(MUTATIONS.setLastUpdated);
                commit(MUTATIONS.updateData);
            } finally {
                commit(MUTATIONS.setLoading, false);
            }
        }

    }

};