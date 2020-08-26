import PHASE from '../../enums/forecast/phase';

import {
    getter
} from '../store';

import {
    dateToUnix
} from '@ocula/utilities';

export default getter(({ forecast }) => {
    if (!forecast) {
        return PHASE.day;
    }

    const {
        sunrise,
        sunset
    } = forecast.current;

    const current = dateToUnix(new Date());
    const isDay = current >= sunrise && current < sunset;

    return isDay ? PHASE.day : PHASE.night;
});