import {
    ILocation
} from './location';

export interface ISettings {
    location?: ILocation | string,
    locations?: ILocation[] 
};