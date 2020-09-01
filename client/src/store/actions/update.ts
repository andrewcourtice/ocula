import STATUS from '../../enums/core/status';

import GLOBAL from '../../constants/core/global';

import setStatus from '../mutations/set-status';
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

    setStatus(STATUS.loading);
    
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
    } catch (error) {
        setStatus(STATUS.error);
    }

    setStatus(null);
}