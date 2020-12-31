import UNITS from '../../../enums/forecast/units';
import UNIT_OF_MEASURE from '../../../constants/forecast/unit-of-measure';

import {
    getter
} from '../store';

export default getter('unitOfMeasure', ({ units }) => UNIT_OF_MEASURE[units || UNITS.metric]);