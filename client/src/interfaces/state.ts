import type {
    ISettings
} from './storage';

import type {
    ILocation
} from './location';

import type {
    IForecast,
    IForecastCurrent,
    IForecastWeather,
    IForecastDay,
    IForecastHour
} from './weather';
import STATUS from '../enums/core/status';

export type Formatted<T, U = string> =  {
    [P in keyof T]: T[P] extends string | number ? {
        raw: T[P];
        formatted: U
    } : Formatted<T[P]>
}

export interface IState {
    status: STATUS;
    lastUpdated: Date;
    settings: ISettings;
    location: ILocation;
    forecast: IForecast;
};

export interface IMappedForecastCurrent extends Omit<IForecastCurrent, 'weather'> {
    weather: IForecastWeather
};

export interface IMappedForecastDay extends Omit<IForecastDay, 'weather'> {
    weather: IForecastWeather
};

export interface IMappedForecastHour extends Omit<IForecastHour, 'weather'> {
    weather: IForecastWeather
};

export interface IMappedForecast extends Omit<IForecast, 'current' | 'daily' | 'hourly'> {
    current: IMappedForecastCurrent;
    today: IMappedForecastDay;
    daily: IMappedForecastDay[];
    hourly: IMappedForecastHour[];
};

export interface IFormatter {
    date(value: Date, format?: string): string;
    time(value: Date, format?: string): string;
};