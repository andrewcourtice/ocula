import ACTIONS from './actions';
import MUTATIONS from './mutations';
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
        weather: {
            forecast: {}
        },
        settings: getSettings()
    },

    mutations: {

        [MUTATIONS.setLocation](state: IState, payload: number | string) {
            state.settings.locationId = payload;
        },
        
        [MUTATIONS.setForecast](state: IState, payload: any) {
            state.weather.forecast = payload;
        }

    },

    actions: {

        async [ACTIONS.loadForecast]({ state, commit }: IAction<IState>) {
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

            const forecast = await getForecast(locationId as number);

            commit(MUTATIONS.setForecast, forecast);
        }

    }

};