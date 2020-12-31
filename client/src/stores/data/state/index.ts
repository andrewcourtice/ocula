import STORAGE_KEYS from '../../../constants/core/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

import type {
    IData
} from '../../../types/storage';

const STATE: IData = {
    status: 'idle',
    lastUpdated: null,
    location: null,
    forecast: null
};

export function getState(): IData {
    const storedState = localStorage.getItem(STORAGE_KEYS.data);

    if (!storedState) {
        return STATE;
    }

    const state = JSON.parse(storedState) as IData;

    state.lastUpdated = new Date(state.lastUpdated);

    return objectMerge(STATE, state);
}