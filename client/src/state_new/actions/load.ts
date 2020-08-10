import loadLocation from './load-location';
import loadForecast from './load-forecast';

import {
    state,
    mutate
} from '../store/index';

import {
    setData
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
        setData(state);
    } finally {
        mutate(state => state.loading = true);
    }
}