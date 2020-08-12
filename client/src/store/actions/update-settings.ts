import {
    state,
    mutate
} from '../store';

import {
    saveSettings
} from '../helpers/storage';

import type {
    ISettings
} from '../../interfaces/storage';

export default function updateSettings(value: Partial<ISettings>) {
    const settings = {
        ...state.settings,
        ...value
    };

    saveSettings(settings);

    mutate(state => state.settings = settings);
}