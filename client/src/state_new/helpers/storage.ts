import DATA from '../../constants/data';
import SETTINGS from '../../constants/settings';
import STORAGE_KEYS from '../../constants/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

import type {
    ISettings,
    IStoredData
} from '../../interfaces/storage';

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

export function saveSettings(settings: ISettings): void {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

export function saveData({ lastUpdated, location, forecast }: IStoredData): void {
    localStorage.setItem(STORAGE_KEYS.data, JSON.stringify({
        location,
        forecast,
        lastUpdated
    }));
}