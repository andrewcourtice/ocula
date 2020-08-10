import {
    state,
    mutate
} from '../store/index';

import {
    getForecast
} from '../../services/weather';

export default async function loadForecast(latitude: number, longitude: number) {
    const {
        units
    } = state.settings;

    const forecast = await getForecast(latitude, longitude, units);

    mutate(state => state.forecast = forecast);
}