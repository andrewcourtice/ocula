import ACTIONS from './actions';
import MUTATIONS from './mutations';
import LOCATIONS from '../../constants/locations';
import STORAGE_KEYS from '../../constants/storage-keys';

import {
    getLocationById,
    getLocationByCoordinates
} from '../../services/location';

import {
    getOutlook,
    getRadar
} from '../../services/weather';

function getOutlookData() {
    const settings = localStorage.getItem(STORAGE_KEYS.outlook);

    if (!settings) {
        return null;
    }

    return JSON.parse(settings);
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
        loading: false,
        lastUpdated: null,

        location: null,
        alerts: [],
        outlook: getOutlookData(),
        radar: null
    },

    mutations: {

        [MUTATIONS.setLoading](state, payload) { 
            state.loading = !!payload;
        },

        [MUTATIONS.setLastUpdated](state) {
            state.lastUpdated = new Date();
        },

        [MUTATIONS.setLocation](state, payload) {
            state.location = payload;
        },

        [MUTATIONS.setOutlook](state, payload) {
            state.outlook = payload;

            localStorage.setItem(STORAGE_KEYS.outlook, JSON.stringify(payload));
        },

        [MUTATIONS.setRadar](state, payload) {
            state.radar = payload;
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

            commit(MUTATIONS.setLocation, location);

            return location;
        },

        async [ACTIONS.loadOutlook]({ commit, dispatch }, payload) {            
            const {
                locationId
            } = payload;

            if (!locationId) {
                throw new Error('LocationId is required');
            }

            commit(MUTATIONS.setLoading, true);

            try {
                const location = await dispatch(ACTIONS.loadLocation, payload);
                const outlook = await getOutlook(location.id);
    
                commit(MUTATIONS.setOutlook, outlook);
            } finally {
                commit(MUTATIONS.setLastUpdated);
                commit(MUTATIONS.setLoading, false);
            }
        },

        async [ACTIONS.loadRadar]({ commit }, payload) {
            const {
                locationId,
                width
            } = payload;

            const radar = await getRadar(locationId, width);

            commit(MUTATIONS.setRadar, radar);
        }

    }

}