import SETTINGS from '../../constants/settings';
import STORAGE_KEYS from '../../constants/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

export function getSettings() {
    let settings = localStorage.getItem(STORAGE_KEYS.settings);

    if (!settings) {
        return SETTINGS;
    }

    settings = JSON.parse(settings);

    return objectMerge(SETTINGS, settings);
}

export function getData() {
    let data = localStorage.getItem(STORAGE_KEYS.data);

    if (data) {
        return JSON.parse(data);
    }

    return {
        location: null,
        forecast: {}
    };
}

export function storeData(state) {
    const {
        location,
        forecast
    } = state;

    localStorage.setItem(STORAGE_KEYS.data, JSON.stringify({
        location,
        forecast
    }));
}