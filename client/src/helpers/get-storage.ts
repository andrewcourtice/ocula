import DATA from '../constants/core/data';
import SETTINGS from '../constants/core/settings';
import MIGRATIONS from '../constants/core/migrations';
import STORAGE_KEYS from '../constants/core/storage-keys';

import {
    objectMerge,
    objectMergeWith,
    typeIsArray
} from '@ocula/utilities';

import type {
    ISettings,
    IData
} from '../types/storage';

export function getSettings(): ISettings {
    const storedSettings = localStorage.getItem(STORAGE_KEYS.settings);

    if (!storedSettings) {
        return SETTINGS;
    }

    let settings = JSON.parse(storedSettings) as ISettings;

    settings = objectMergeWith(SETTINGS, settings, (obj, src) => {
        if (typeIsArray(obj)) {
            return src;
        }
    });

    if (settings.version < SETTINGS.version && settings.version in MIGRATIONS) {
        try {
            settings = MIGRATIONS[settings.version.toString()](settings);
            settings.version = SETTINGS.version;
        } catch (error) {
            console.warn('Failed to migrate settings');
        }
    }

    return settings;
}

export function getData(): IData {
    const storedData = localStorage.getItem(STORAGE_KEYS.data);

    if (!storedData) {
        return DATA;
    }

    const data = JSON.parse(storedData) as IData;

    data.lastUpdated = new Date(data.lastUpdated);

    return objectMerge(DATA, data);
}