import {
    state,
    mutate
} from '../store/index';

import {
    setSettings
} from '../helpers/storage';

import type {
    ISettings
} from '../../interfaces/settings';

export default function updateSettings(value: Partial<ISettings>) {
    const settings = {
        ...state.settings,
        ...value
    };

    setSettings(settings);

    mutate(state => state.settings = settings);
}