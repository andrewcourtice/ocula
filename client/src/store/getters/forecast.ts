import UNITS from '../../enums/units';
import FORMATS from '../../constants/formats';

import {
    defaultFormatter
} from '../../constants/formatters';

import {
    getter
} from '../store';

import {
    objectTransform
} from '@ocula/utilities';

import type {
    Formatted,
    IForecast,
    IMappedForecast
} from '../../interfaces/weather';

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

    const today = daily[0];
    
    return {
        ...other,
        today,
        daily
    };
});