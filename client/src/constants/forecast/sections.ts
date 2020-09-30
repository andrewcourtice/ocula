import FORECAST_SECTION from '../../enums/forecast/section';

import DailyForecast from '../../components/forecast/daily-forecast.vue';
import HourlyForecast from '../../components/forecast/hourly-forecast.vue';
import Today from '../../components/forecast/today.vue';
import UvIndex from '../../components/forecast/uv-index.vue';
import Tides from '../../components/forecast/tides.vue';

import type {
    Formatted,
    IMappedForecast
} from '../../interfaces/state';

interface IForecastSection {
    label: string;
    component: typeof DailyForecast,
    condition?(forecast: Formatted<IMappedForecast>): boolean;
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
    [FORECAST_SECTION.today]: {
        label: 'Today',
        component: Today
    },
    [FORECAST_SECTION.uvIndex]: {
        label: 'UV Index',
        component: UvIndex
    },
    [FORECAST_SECTION.tides]: {
        label: 'Tides',
        component: Tides,
        condition: forecast => forecast.tides && forecast.tides.status.raw === 200
    }
} as Record<FORECAST_SECTION, IForecastSection>;