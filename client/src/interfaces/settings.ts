import {
    ILocation
} from './location';

export interface ISettings {
    units: String,
    location?: ILocation | string,
    locations?: ILocation[] 
};