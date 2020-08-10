import FORMATS from '../../constants/formats';
import UNITS from '../../constants/units';

import formatData from '../../helpers/format-data';

import {
    getter
} from '../store/index';

export default getter(state => {
    const {
        units
    } = state.settings;

    const format = FORMATS[units] || FORMATS[UNITS.metric];

    return formatData(state.forecast, format);
});