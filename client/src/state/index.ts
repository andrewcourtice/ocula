import MUTATIONS from './mutations';
import ACTIONS from './actions';
import SETTINGS from '../constants/settings';
import LOCATIONS from '../constants/locations';
import STORAGE_KEYS from '../constants/storage-keys';

import {
    getLocation
} from '../services/location';

import {
    getForecast
} from '../services/weather';

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

function getData() {
    let data = localStorage.getItem(STORAGE_KEYS.data);

    if (!data) {
        return {};
    }

    return JSON.parse(data);
}

async function getCurrentPosition() {
    const position: Position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            maximumAge: 0,
            enableHighAccuracy: true
        });
    });

    if (position) {
        return position.coords;
    }

    return {
        latitude: 0,
        longitude: 0,
    };
}

export default {
    devtools: true,

    state: {
        loading: false,
        updateReady: false,

        location: null,
        forecast: getData(),
        settings: getSettings()
    },

    mutations: {

        [MUTATIONS.setUpdateReady](state) {
            state.updateReady = true;
        },

        [MUTATIONS.setLoading](state, payload) {
            state.loading = !!payload;
        },

        [MUTATIONS.setLocation](state, payload) {
            state.location = payload;
        },

        [MUTATIONS.setForecast](state, payload) {
            localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(payload));

            state.forecast = payload;
        },

        [MUTATIONS.updateSettings](state, payload) {
            const settings = objectMerge(state.settings, payload);

            localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));

            state.settings = settings;
        } 

    },

    actions: {

        async [ACTIONS.loadLocation]({ state, commit }) {
            const {
                location
            } = state.settings;

            let latitude,
                longitude;

            if (location === LOCATIONS.current) {
                ({
                    latitude,
                    longitude
                } = await getCurrentPosition());
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
            } finally {
                commit(MUTATIONS.setLoading, false);
            }
        }

    }

};