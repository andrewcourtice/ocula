import DATA from '../../constants/data';
import SETTINGS from '../../constants/settings';
import STORAGE_KEYS from '../../constants/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

import type {
    IState
} from '../../interfaces/state';

import type {
    ISettings
} from '../../interfaces/settings';

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

export function setSettings(settings: ISettings): void {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

export function setData({ lastUpdated, location, forecast }: IState): void {
    localStorage.setItem(STORAGE_KEYS.data, JSON.stringify({
        location,
        forecast,
        lastUpdated
    }));
}