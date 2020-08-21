import FORECAST_SECTION from '../enums/section';

import DailyForecast from '../components/forecast/daily-forecast.vue';
import HourlyForecast from '../components/forecast/hourly-forecast.vue';
import Observations from '../components/forecast/observations.vue';
import UvIndex from '../components/forecast/uv-index.vue';

interface IForecastSection {
    label: string;
    component: typeof DailyForecast
}

export default {
    [FORECAST_SECTION.dailyForecast]: {
        label: 'Daily Forecast',
        component: DailyForecast
    },
    [FORECAST_SECTION.hourlyForecast]: {
        label: 'Hourly Forecast',
        component: HourlyForecast
    },
    [FORECAST_SECTION.observations]: {
        label: 'Observations',
        component: Observations
    },
    [FORECAST_SECTION.uvIndex]: {
        label: 'UV Index',
        component: UvIndex
    }
} as Record<FORECAST_SECTION, IForecastSection>;