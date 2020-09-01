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
        status: null
    };
}

export default getState();