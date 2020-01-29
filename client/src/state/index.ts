import GLOBAL from '../constants/global';
import LOCATIONS from '../constants/locations';
import STORAGE_KEYS from '../constants/storage-keys';
import GETTERS from './getters';
import MUTATIONS from './mutations';
import ACTIONS from './actions';

import UNIT_FORMATS, {
    DEFAULT_UNIT_FORMAT
} from '../constants/unit-formats';

import {
    getLocation
} from '../services/location';

import {
    getForecast
} from '../services/weather';

import {
    getSettings,
    getData,
    storeData
} from './helpers/storage';

import {
    getPosition
} from './helpers/location';

import {
    formatDataPoint
} from './helpers/data';

import {
    objectMerge
} from '@ocula/utilities';

import {
    IState
} from '../interfaces/state';

function getState(): IState {
    const settings = getSettings();

    const {
        location,
        forecast
    } = getData();

    return {
        settings,
        location,
        forecast,

        loading: false,
        updateReady: false,
        lastUpdated: null
    };
}

export default {
    devtools: true,

    state: getState(),

    getters: {

        [GETTERS.formats](state: IState) {
            const flags = state.forecast.flags;

            if (!flags || !flags.units || !UNIT_FORMATS[flags.units]) {
                return DEFAULT_UNIT_FORMAT;
            }

            return {
                ...DEFAULT_UNIT_FORMAT,
                ...UNIT_FORMATS[flags.units]
            };
        },

        [GETTERS.current](state: IState, getters) {
            const current = state.forecast.currently;

            if (current) {
                return formatDataPoint(current, getters[GETTERS.formats]);
            }
        },

        [GETTERS.daily](state: IState, getters) {
            const daily = state.forecast.daily;

            if (!daily || !daily.data) {
                return;
            }

            const unitFormats = getters[GETTERS.formats];

            return daily.data.map(day => formatDataPoint(day, unitFormats));  
        },

        [GETTERS.hourly](state: IState, getters) {
            const hourly = state.forecast.hourly;

            if (!hourly || !hourly.data) {
                return;
            }

            const unitFormats = getters[GETTERS.formats];

            return hourly.data.map(hour => formatDataPoint(hour, unitFormats));
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
            storeData(state);
        },

        [MUTATIONS.setForecast](state, payload) {
            state.forecast = payload;
            storeData(state);
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

        async [ACTIONS.loadForecast]({ commit }, payload) {
            const {
                latitude,
                longitude
            } = payload;

            const forecast = await getForecast(latitude, longitude);

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
            } finally {
                commit(MUTATIONS.setLoading, false);
            }
        }

    }

};