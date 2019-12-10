import STATE from './state';
import ACTIONS from './actions';
import MUTATIONS from './mutations';
import LOCATIONS from '../../constants/locations';
import STORAGE_KEYS from '../../constants/storage-keys';

import {
    getLocationById,
    getLocationByCoordinates
} from '../../services/location';

import {
    getToday,
    getTrends,
    getForecast,
    getRadar
} from '../../services/weather';

import {
    objectMerge
} from '@ocula/utilities';

const DATA = {
    [STATE.location]: null,
    [STATE.today]: null,
    [STATE.trends]: null,
    [STATE.forecast]: null,
    [STATE.radar]: null,
    [STATE.warnings]: null
};

function getData() {
    let data = localStorage.getItem(STORAGE_KEYS.data);

    if (!data) {
        return DATA;
    }

    data = JSON.parse(data);

    return objectMerge(DATA, data);
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

    namespaced: true,

    state: {
        data: getData()
    },

    mutations: {

        [MUTATIONS.setData](state, payload) {
            const {
                key,
                value
            } = payload;

            if (!key) {
                return;
            }

            state.data[key] = value;
            
            localStorage.setItem(STORAGE_KEYS.data, JSON.stringify(state.data));
        }

    },

    actions: {

        async [ACTIONS.loadLocation]({ state, commit }, payload) {
            const {
                locationId
            } = payload;

            // Don't get a new location if we haven't moved (unless locationId === current)
            if (state.location && state.locationId === locationId) {
                return;
            }

            let location;

            if (locationId === LOCATIONS.current) {
                const { 
                    latitude,
                    longitude
                } = await getCurrentPosition();

                location = await getLocationByCoordinates(latitude, longitude);
            } else {
                location = await getLocationById(locationId);
            }

            commit(MUTATIONS.setData, {
                key: STATE.location,
                value: location
            });

            return location;
        },

        async [ACTIONS.loadToday]({ commit }, payload) {
            const {
                locationId
            } = payload;

            const value = await getToday(locationId);

            commit(MUTATIONS.setData, {
                value,
                key: STATE.today,
            });        
        },

        async [ACTIONS.loadTrends]({ commit }, payload) {
            const {
                locationId
            } = payload;

            const value = await getTrends(locationId);

            commit(MUTATIONS.setData, {
                value,
                key: STATE.trends,
            });
        },

        async [ACTIONS.loadForecast]({ commit }, payload) {
            const {
                locationId
            } = payload;

            const value = await getForecast(locationId);

            commit(MUTATIONS.setData, {
                value,
                key: STATE.forecast,
            });
        },

        async [ACTIONS.loadRadar]({ commit }, payload) {
            const {
                locationId,
                width
            } = payload;

            const value = await getRadar(locationId, width);

            commit(MUTATIONS.setData, {
                value,
                key: STATE.radar,
            });
        }

    }

}