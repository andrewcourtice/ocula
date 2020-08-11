import FORMATS from '../../constants/formats';
import UNITS from '../../constants/units';

import {
    defaultFormatter
} from '../../constants/formatters';

import {
    getter
} from '../store/index';

import {
    objectTransform
} from '@ocula/utilities';

export default getter(state => {
    const {
        units
    } = state.settings;

    const format = FORMATS[units] || FORMATS[UNITS.metric];

    return objectTransform(state.forecast, format, defaultFormatter);
});