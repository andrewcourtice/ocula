import type LOCATION from '../enums/forecast/location';
import UNITS from '../enums/forecast/units';
import type MAP from '../enums/maps/map';
import type FORECAST_SECTION from '../enums/forecast/section';

import type {
    ILocation
} from './location';

import type {
    IForecast
} from './weather';

interface ISection {
    type: FORECAST_SECTION;
    visible: boolean;
    options: any;
}

export interface ISettings {
    version: number;
    units: UNITS;
    theme: string;
    location?: ILocation | LOCATION;
    locations?: ILocation[];
    forecast: {
        sections: ISection[];
    },
    maps: {
        default: MAP;
    }
};

export interface IStoredData {
    lastUpdated: Date;
    location: ILocation;
    forecast: IForecast;
}