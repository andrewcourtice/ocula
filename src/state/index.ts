import ACTIONS from './actions';
import MUTATIONS from './mutations';
import SETTINGS from '../constants/settings';
import LOCATIONS from '../constants/locations';

import {
    reverseGeocode
} from '../services/geocoding';

import {
    getForecast
} from '../services/forecast';

function getSettings() {
    const settings = localStorage.getItem('ocula');

    if (!settings) {
        return SETTINGS;
    }

    return JSON.parse(settings);
}

async function getCurrentPosition() {
    const position: Position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
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
        forecast: {
            location: {
                name: 'Unknown',
                latitude: 0,
                longitude: 0
            },
            currently: {},
            daily: [],
            hourly: []
        },
        settings: getSettings()
    },

    mutations: {

        [MUTATIONS.setLocation](state, payload) {
            state.settings.location = payload;
        },
        
        [MUTATIONS.setForecast](state, payload) {
            console.log(payload);
            state.forecast = payload;
        }

    },

    actions: {

        async [ACTIONS.loadForecast]({ state, commit }) {
            let {
                units,
                location
            } = state.settings;

            if (!location || !(location.latitude && location.longitude)) {
                location = LOCATIONS.follow;

                commit(MUTATIONS.setLocation, location);
            }

            if (location === LOCATIONS.follow) {
                const { 
                    latitude,
                    longitude
                } = await getCurrentPosition();

                const {
                    name
                } = await reverseGeocode(latitude, longitude);

                location = {
                    name,
                    latitude,
                    longitude
                };
            }

            const {
                latitude,
                longitude
            } = location;

            const forecast = await getForecast(latitude, longitude, units);

            commit(MUTATIONS.setForecast, {
                location,
                ...forecast
            });
        }

    }

};