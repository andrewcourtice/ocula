import PHASE from '../../../enums/forecast/phase';

import {
    state
} from '../store';

import type {
    ReadState
} from '@harlem/core';

import type {
    IForecast
} from '../../../types/weather';

export function getPhaseRaw(forecast: ReadState<IForecast>, timestamp: number): PHASE {
    if (!forecast) {
        return PHASE.day;
    }
    
    const isDay = forecast.daily.some(({ sunrise, sunset }) => {
        return timestamp > sunrise && timestamp < sunset;
    });
    
    return isDay ? PHASE.day : PHASE.night;
}

export default function getPhase(timestamp: number): PHASE {
    return getPhaseRaw(state.forecast, timestamp);
}