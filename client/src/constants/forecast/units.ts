import UNITS from '../../enums/forecast/units';

export default {
    [UNITS.metric]: {
        label: 'Metric'
    },
    [UNITS.imperial]: {
        label: 'Imperial'
    }
} as const;