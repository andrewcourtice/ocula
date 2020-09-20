import UNITS from '../../enums/forecast/units';
import OBSERVATION from '../../enums/forecast/observation';
import UNIT_OF_MEASURE from '../../enums/forecast/unit-of-measure';

type UnitOfMeasure = Record<OBSERVATION, UNIT_OF_MEASURE>

export default {
    [UNITS.metric]: {
        [OBSERVATION.temperature]: UNIT_OF_MEASURE.celcius,
        [OBSERVATION.pressure]: UNIT_OF_MEASURE.hectopascals,
        [OBSERVATION.windSpeed]: UNIT_OF_MEASURE.metresPerSecond,
        [OBSERVATION.precipitation]: UNIT_OF_MEASURE.percentage
    },
    [UNITS.imperial]: {
        [OBSERVATION.temperature]: UNIT_OF_MEASURE.fahrenheit,
        [OBSERVATION.pressure]: UNIT_OF_MEASURE.millibars,
        [OBSERVATION.windSpeed]: UNIT_OF_MEASURE.milesPerHour,
        [OBSERVATION.precipitation]: UNIT_OF_MEASURE.percentage
    }
} as Record<UNITS, UnitOfMeasure>