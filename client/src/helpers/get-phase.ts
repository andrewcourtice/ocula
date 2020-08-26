import PHASE from '../enums/forecast/phase';

import {
    state
} from '../store';

export default function getPhase(timestamp: number): PHASE {
    if (!state.forecast) {
        return PHASE.day;
    }

    const isDay = state.forecast.daily.some(({ sunrise, sunset }) => {
        return timestamp > sunrise && timestamp < sunset;
    });

    return isDay ? PHASE.day : PHASE.night;
}