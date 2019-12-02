import MUTATIONS from './mutations';
import ACTIONS from './actions';
import LOCATIONS from '../../constants/locations';

import IAction from '../../interfaces/action';

import {
    getLocationById,
    getLocationByCoordinates
} from '../../services/location';

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

    namespaced: true,

    state: {
        location: {}
    },

    mutations: {

        [MUTATIONS.setLocation](state, payload) {
            state.location = payload;
        }

    },

    actions: {

        async [ACTIONS.loadLocation]({ state, commit }: IAction<any>, payload) {
            const {
                locationId
            } = payload;

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
        }

    }

}