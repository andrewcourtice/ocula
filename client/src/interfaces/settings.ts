import {
    ILocation
} from './location';

export interface ISettings {
    units: string,
    location?: ILocation | string,
    locations?: ILocation[] 
};