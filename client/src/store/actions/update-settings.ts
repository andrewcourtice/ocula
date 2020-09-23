import setSettings from '../mutations/set-settings';

import type {
    ISettings
} from '../../interfaces/storage';

export default function updateSettings(settings: Partial<ISettings>): void {
    setSettings(settings);
}