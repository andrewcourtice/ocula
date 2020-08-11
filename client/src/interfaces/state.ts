import type {
    ISettings
} from './storage';

import type {
    ILocation
} from './location';

import type {
    IForecast
} from './weather';

export interface IState {
    loading: boolean,
    updateReady: boolean,
    lastUpdated: Date,
    settings: ISettings,
    location: ILocation,
    forecast: IForecast
};