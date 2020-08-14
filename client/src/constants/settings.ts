import UNITS from './units';

import type {
    ISettings
} from '../interfaces/storage';

export default {
    version: 1,
    units: UNITS.metric,
    theme: 'default',
    location: null,
    locations: []
} as ISettings;