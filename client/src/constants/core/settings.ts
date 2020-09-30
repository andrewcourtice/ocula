import UNITS from '../../enums/forecast/units';
import MAP from '../../enums/maps/map';
import FORECAST_SECTION from '../../enums/forecast/section';

import type {
    ISettings
} from '../../interfaces/storage';

export default {
    version: 1.1,
    units: UNITS.metric,
    theme: 'default',
    location: null,
    locations: [],
    forecast: {
        sections: [
            {
                type: FORECAST_SECTION.today,
                visible: true
            },
            {
                type: FORECAST_SECTION.dailyForecast,
                visible: true
            },
            {
                type: FORECAST_SECTION.hourlyForecast,
                visible: true
            },
            {
                type: FORECAST_SECTION.uvIndex,
                visible: true
            },
            {
                type: FORECAST_SECTION.tides,
                visible: true
            }
        ]
    },
    maps: {
        default: MAP.radar,
    }
} as ISettings;