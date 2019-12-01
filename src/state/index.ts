import ACTIONS from './actions';
import MUTATIONS from './mutations';
import GETTERS from './getters';
import SETTINGS from '../constants/settings';
import LOCATIONS from '../constants/locations';

import IAction from '../interfaces/action';
import IState from '../interfaces/state';

import {
    getLocation
} from '../services/location';

import {
    getForecast
} from '../services/weather';

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
        forecast: {},
        settings: getSettings()
    },

    getters: {

        [GETTERS.location](state: IState) {           
            return state.forecast.location || {};
        },

        forecast(state: IState) {
            const forecasts = state.forecast.forecasts;   

            if (!forecasts) {
                return;
            }

            const {
                weather,
                temperature,
                rainfall
            } = forecasts;


        }

    },

    mutations: {

        [MUTATIONS.setLocation](state: IState, payload: number | string) {
            state.settings.locationId = payload;
        },
        
        [MUTATIONS.setForecast](state: IState, payload: any) {
            state.forecast = payload;
        }

    },

    actions: {

        async [ACTIONS.loadForecast]({ commit }: IAction<IState>, payload) {
            const {
                locationId,
                days
            } = payload;

            const forecast = await getForecast(locationId, days);

            commit(MUTATIONS.setForecast, forecast);
        },

        async [ACTIONS.load]({ state, commit, dispatch }: IAction<IState>) {
            let {
                locationId
            } = state.settings;

            if (!locationId) {
                locationId = LOCATIONS.follow;

                commit(MUTATIONS.setLocation, locationId);
            }

            if (locationId === LOCATIONS.follow) {
                const { 
                    latitude,
                    longitude
                } = await getCurrentPosition();

                const location = await getLocation(latitude, longitude);

                locationId = location.id;
            }

            if (!locationId) {
                return;
            }

            await Promise.all([
                dispatch(ACTIONS.loadForecast, { locationId })
            ]);
        }

    }

};