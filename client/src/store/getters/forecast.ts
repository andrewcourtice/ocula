import UNITS from '../../enums/forecast/units';
import FORMATS from '../../constants/forecast/formats';

import {
    defaultFormatter
} from '../../constants/forecast/formatters';

import {
    getter
} from '../store';

import {
    objectTransform
} from '@ocula/utilities';

import type {
    Formatted,
    IMappedForecast
} from '../../types/state';

import type {
    IForecast
} from '../../types/weather';

export default getter<Formatted<IMappedForecast>>(state => {
    const {
        forecast,
        settings
    } = state;

    if (!forecast) {
        return;
    }

    const format = FORMATS[settings.units] || FORMATS[UNITS.metric];

    const {
        daily,
        ...other
    } = objectTransform<IForecast, Formatted<IMappedForecast>>(forecast, format, defaultFormatter);

    const today = daily.shift();
    
    return {
        ...other,
        today,
        daily
    };
});