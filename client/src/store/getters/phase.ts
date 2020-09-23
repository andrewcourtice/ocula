import getPhase from '../../helpers/get-phase';

import {
    getter
} from '../store';

import {
    dateToUnix
} from '@ocula/utilities';

export default getter(() => getPhase(dateToUnix(new Date())));