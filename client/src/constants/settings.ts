import UNITS from '../enums/units';
import MAP from '../enums/map';

import type {
    ISettings
} from '../interfaces/storage';

export default {
    version: 1,
    units: UNITS.metric,
    theme: 'default',
    defaultMap: MAP.radar,
    location: null,
    locations: []
} as ISettings;