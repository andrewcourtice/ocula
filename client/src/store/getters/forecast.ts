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
        units
    } = state.settings;

    const format = FORMATS[units] || FORMATS[UNITS.metric];

    const output = objectTransform(state.forecast, format, defaultFormatter);

    console.log(output);

    return output;
});