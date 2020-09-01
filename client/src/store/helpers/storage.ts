import DATA from '../../constants/core/data';
import SETTINGS from '../../constants/core/settings';
import STORAGE_KEYS from '../../constants/core/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

import type {
    ISettings,
    IStoredData
} from '../../interfaces/storage';

export function getSettings(): ISettings {
    let settings = localStorage.getItem(STORAGE_KEYS.settings);

    if (!settings) {
        return SETTINGS;
    }

    settings = JSON.parse(settings);

    return objectMerge(SETTINGS, settings);
}

export function getData(): IStoredData {
    const storedData = localStorage.getItem(STORAGE_KEYS.data);

    if (!storedData) {
        return DATA;
    }

    const data = JSON.parse(storedData) as IStoredData;

    data.lastUpdated = new Date(data.lastUpdated);

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