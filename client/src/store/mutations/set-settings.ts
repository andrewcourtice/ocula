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

import {
    objectMerge
} from '@ocula/utilities';

export default function setSettings(value: Partial<ISettings>) {
    const settings = objectMerge(state.settings, value);

    mutate(state => state.settings = settings);
    saveSettings(settings);
}