import loadLocation from './load-location';
import loadForecast from './load-forecast';

import {
    state,
    mutate
} from '../store/index';

import {
    saveData
} from '../helpers/storage';

export default async function load() {
    mutate(state => state.loading = true);
    
    try {
        const {
            latitude,
            longitude
        } = await loadLocation();
        
        await loadForecast(latitude, longitude);
        
        mutate(state => state.lastUpdated = new Date());

        const {
            lastUpdated,
            location,
            forecast
        } = state;

        saveData({
            lastUpdated,
            location,
            forecast
        });

    } finally {
        mutate(state => state.loading = false);
    }
}