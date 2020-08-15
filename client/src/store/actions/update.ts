import GLOBAL from '../../constants/global';

import setLoading from '../mutations/set-loading';
import setLastUpdated from '../mutations/set-last-updated';

import loadLocation from './load-location';
import loadForecast from './load-forecast';

import {
    state
} from '../store';

import {
    saveData
} from '../helpers/storage';

export default async function update(force: boolean = false) {
    const lastUpdated = state.lastUpdated;

    if (!force && lastUpdated && Date.now() - +lastUpdated < GLOBAL.updateThreshold) {
        return;
    }

    setLoading(true);
    
    try {
        const {
            latitude,
            longitude
        } = await loadLocation();
        
        await loadForecast(latitude, longitude);
        
        setLastUpdated();
        
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
        setLoading(false);
    }
}