import DATA from '../../constants/data';
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

    if (!data) {
        return DATA;
    }

    data = JSON.parse(data);

    return objectMerge(DATA, data);
}