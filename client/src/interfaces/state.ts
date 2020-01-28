import {
    ISettings
} from './settings';

import {
    ILocation
} from './location';

export interface IState {
    loading: boolean,
    updateReady: boolean,
    lastUpdated: Date,
    settings: ISettings,
    location: ILocation,
    forecast: any
};