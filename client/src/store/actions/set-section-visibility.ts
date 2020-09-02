import FORECAST_SECTION from '../../enums/forecast/section';

import updateSettings from './update-settings';

import {
    state
} from '../store';

export default function setSectionVisibility(type: FORECAST_SECTION, isVisible = true): void {
    let {
        sections
    } = state.settings.forecast;

    sections = sections.map(section => {
        const visible = section.type === type ? isVisible : section.visible;

        return {
            ...section,
            visible
        };
    });

    updateSettings({
        forecast: {
            sections
        }
    });
}