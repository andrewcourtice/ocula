import UNITS from '../enums/units';
import MAP from '../enums/map';
import FORECAST_SECTION from '../enums/section';

import type {
    ISettings
} from '../interfaces/storage';

export default {
    version: 1,
    units: UNITS.metric,
    theme: 'default',
    location: null,
    locations: [],
    forecast: {
        sections: [
            {
                type: FORECAST_SECTION.dailyForecast,
                visible: true
            },
            {
                type: FORECAST_SECTION.observations,
                visible: true
            },
            {
                type: FORECAST_SECTION.uvIndex,
                visible: true
            },
            {
                type: FORECAST_SECTION.hourlyForecast,
                visible: true
            }
        ]
    },
    maps: {
        default: MAP.radar,
    }
} as ISettings;