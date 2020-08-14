import FORMATS from '../../constants/formats';
import UNITS from '../../constants/units';

import {
    defaultFormatter
} from '../../constants/formatters';

import {
    getter
} from '../store';

import {
    objectTransform
} from '@ocula/utilities';

export default getter(state => {
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
    } = objectTransform(forecast, format, defaultFormatter);

    const today = daily[0];

    return {
        ...other,
        today,
        daily
    };
});