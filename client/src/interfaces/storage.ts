import type LOCATION from '../enums/location';

import type {
    ILocation
} from './location';

import type {
    IForecast
} from './weather';

export interface ISettings {
    version: number;
    units: string;
    theme: string;
    location?: ILocation | LOCATION;
    locations?: ILocation[];
};

export interface IStoredData {
    lastUpdated: Date;
    location: ILocation;
    forecast: IForecast;
}