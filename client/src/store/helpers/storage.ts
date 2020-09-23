import DATA from '../../constants/core/data';
import SETTINGS from '../../constants/core/settings';
import MIGRATIONS from '../../constants/core/migrations';
import STORAGE_KEYS from '../../constants/core/storage-keys';

import {
    objectMerge
} from '@ocula/utilities';

import type {
    ISettings,
    IStoredData
} from '../../interfaces/storage';

export function getSettings(): ISettings {
    const storedSettings = localStorage.getItem(STORAGE_KEYS.settings);

    if (!storedSettings) {
        return SETTINGS;
    }

    let settings = JSON.parse(storedSettings) as ISettings;

    settings = objectMerge(SETTINGS, settings);

    if (settings.version < SETTINGS.version && settings.version in MIGRATIONS) {
        try {
            settings = MIGRATIONS[settings.version](settings);
        } catch (error) {
            console.warn('Failed to migrate settings');
        }
    }

    return settings;
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

export function clearData(): void {
    localStorage.removeItem(STORAGE_KEYS.data);
}