import FORECAST_SECTION from '../../enums/forecast/section';

import updateSettings from './update-settings';

import {
    state
} from '../store';

import {
    arraySwapBy
} from '@ocula/utilities';

export default function moveSection(type: FORECAST_SECTION, offset: number = 1): void {
    let {
        sections
    } = state.settings.forecast;

    const index = sections.findIndex(section => section.type === type);

    sections = arraySwapBy(sections, index, index + offset);

    updateSettings({
        forecast: {
            sections
        }
    });
}