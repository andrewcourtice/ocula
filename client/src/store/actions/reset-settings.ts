import SETTINGS from '../../constants/core/settings';

import {
    mutate
} from '../store';

import {
    saveSettings
} from '../helpers/storage';

export default function resetSettings() {
    mutate(state => state.settings = SETTINGS);
    saveSettings(SETTINGS);
}