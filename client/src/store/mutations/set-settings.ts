import {
    state,
    mutate
} from '../store';

import {
    saveSettings
} from '../helpers/storage';

import type {
    ISettings
} from '../../types/storage';

export default function setSettings(value: Partial<ISettings>) {
    const settings = {
        ...state.settings,
        ...value
    };

    mutate('set-settings', state => state.settings = settings);
    saveSettings(settings);
}