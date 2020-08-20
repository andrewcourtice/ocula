export type FormattedForecast<T, U = string> =  {
    [P in keyof T]: T[P] extends string | number ? {
        raw: T[P];
        formatted: U
    } : FormattedForecast<T[P]>
}

export interface IForecast {
    lat: number;
    lon: number;
    timezone: string;
    timezoneOffset: number;
    current: IForecastCurrent;
    hourly: IForecastHour[];
    daily: IForecastDay[];
    radar: IForecastRadar;
}

export interface IForecastWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IForecastFeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface IForecastTemperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface IForecastCurrent {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi?: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    weather: IForecastWeather[];
    rain?: Record<string, number>;
    snow?: Record<string, number>;
}

export interface IForecastHour {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feelsLike: number;
    pressure: number;
    humidity: number;
    dewPoint: number;
    uvi?: number;
    clouds: number;
    visibility: number;
    windSpeed: number;
    windDeg: number;
    weather: IForecastWeather[];
    pop: number;
    rain?: Record<string, number>;
    snow?: Record<string, number>;
}

export interface IForecastDay {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: IForecastTemperature;
    feelsLike: IForecastFeelsLike;
    pressure: number;
    humidity: number;
    dewPoint: number;
    windSpeed: number;
    windDeg: number;
    weather: IForecastWeather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: Record<string, number>;
    snow?: Record<string, number>;
}

export interface IForecastRadar {
    timestamps: number[];
}