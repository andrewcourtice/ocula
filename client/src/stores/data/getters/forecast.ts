import UNITS from '../../../enums/forecast/units';
import FORMATS from '../../../constants/forecast/formats';

import {
    defaultFormatter
} from '../../../constants/forecast/formatters';

import {
    getter
} from '../store';

import {
    state as settings
} from '../../settings';

import {
    objectTransform
} from '@ocula/utilities';

import type {
    Formatted,
    IMappedForecast
} from '../../../types/state';

export default getter<Formatted<IMappedForecast>>('forecast', ({ forecast }) => {
    if (!forecast) {
        return;
    }

    const format = FORMATS[settings.units] || FORMATS[UNITS.metric];

    const {
        daily,
        ...other
    } = objectTransform<typeof forecast, Formatted<IMappedForecast>>(forecast, format, defaultFormatter);

    const today = daily.shift();
    
    return {
        ...other,
        today,
        daily
    };
});