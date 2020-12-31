import setSettings from '../mutations/set-settings';

import type {
    ISettings
} from '../../types/storage';

export default function updateSettings(settings: Partial<ISettings>): void {
    setSettings(settings);
}