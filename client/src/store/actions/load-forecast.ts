import {
    state,
    mutate
} from '../store';

import {
    getForecast
} from '../../services/weather';

export default async function loadForecast(latitude: number, longitude: number) {
    const {
        units
    } = state.settings;

    const forecast = await getForecast(latitude, longitude, units);

    mutate('set-forecast', state => state.forecast = forecast);
}