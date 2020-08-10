import createStore from '@ocula/state';

import {
    getSettings,
    getData
} from '../helpers/storage';

import {
    IState
} from '../../interfaces/state';

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

export const {
    state,
    getter,
    mutate
} = createStore(getState());