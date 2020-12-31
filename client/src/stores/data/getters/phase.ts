import {
    getPhaseRaw
} from '../producers/get-phase';

import {
    getter
} from '../store';

import {
    dateToUnix
} from '@ocula/utilities';

export default getter('phase', state => getPhaseRaw(state.forecast, dateToUnix(new Date())));