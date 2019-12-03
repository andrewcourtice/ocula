import FORECASTS from '../_constants/forecasts';

import transformSingleEntry from './single-entry';
import transformMultiEntry from './multi-entry';

export default {
    [FORECASTS.weather]: transformSingleEntry,
    [FORECASTS.temperature]: transformMultiEntry,
    [FORECASTS.rainfall]: transformSingleEntry,
    [FORECASTS.rainfallProbability]: transformMultiEntry,
    [FORECASTS.wind]: transformMultiEntry,
};