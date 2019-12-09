import FORECASTS from '../_constants/forecasts';

import transformSingleEntry from './single-entry';
import transformMultiEntry from './multi-entry';

export default {
    [FORECASTS.temperature]: transformMultiEntry,
    [FORECASTS.rainfall]: transformSingleEntry,
    [FORECASTS.rainfallProbability]: transformMultiEntry,
    [FORECASTS.sunriseSunset]: transformSingleEntry,
    [FORECASTS.tides]: transformMultiEntry,
    [FORECASTS.uv]: transformMultiEntry,
    [FORECASTS.weather]: transformSingleEntry,
    [FORECASTS.wind]: transformMultiEntry,
    [FORECASTS.precis]: transformMultiEntry
};