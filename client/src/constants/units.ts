import UNITS from '../enums/units';

export default {
    [UNITS.metric]: {
        label: 'Metric'
    },
    [UNITS.imperial]: {
        label: 'Imperial'
    }
} as const;