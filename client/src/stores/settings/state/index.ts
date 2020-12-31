import UNITS from '../../../enums/forecast/units';
import MAP from '../../../enums/maps/map';
import FORECAST_SECTION from '../../../enums/forecast/section';

import MIGRATIONS from '../../../constants/core/migrations';
import STORAGE_KEYS from '../../../constants/core/storage-keys';

import {
    objectMergeWith,
    typeIsArray
} from '@ocula/utilities';

import type {
    ISettings
} from '../../../types/storage';

const STATE: ISettings = {
    version: 1.1,
    units: UNITS.metric,
    theme: 'default',
    location: null,
    locations: [],
    forecast: {
        sections: [
            {
                type: FORECAST_SECTION.today,
                visible: true
            },
            {
                type: FORECAST_SECTION.dailyForecast,
                visible: true
            },
            {
                type: FORECAST_SECTION.hourlyForecast,
                visible: true
            },
            {
                type: FORECAST_SECTION.uvIndex,
                visible: true
            },
            {
                type: FORECAST_SECTION.tides,
                visible: true
            }
        ]
    },
    maps: {
        default: MAP.radar,
        zoom: 7,
        pitch: 45,
        framerate: 500
    }
};

export function getState(): ISettings {
    const storedState = localStorage.getItem(STORAGE_KEYS.settings);

    if (!storedState) {
        return STATE;
    }

    let state = JSON.parse(storedState) as ISettings;

    state = objectMergeWith(STATE, state, (obj, src) => {
        if (typeIsArray(obj)) {
            return src;
        }
    });

    if (state.version < STATE.version && state.version in MIGRATIONS) {
        try {
            state = MIGRATIONS[state.version.toString()](state);
            state.version = STATE.version;
        } catch (error) {
            console.warn('Failed to migrate settings');
        }
    }

    return state;
}