import UNITS from '../../enums/forecast/units';

import FORMATTERS, {
    defaultFormatter
} from './formatters';

import {
    objectMerge,
    objectTransform
} from '@ocula/utilities';

import type {
    IForecastWeather
} from '../../interfaces/weather';

const {
    general,
    temperature,
    distance,
    speed,
    pressure,
    direction
} = FORMATTERS;

function weatherTransform(value: IForecastWeather[]): Record<string, any> {
    return objectTransform(value[0], {
        description: general.description
    }, defaultFormatter);
}

const BASE_FORMATS = {
    current: {
        dt: general.datetime,
        sunrise: general.datetime,
        sunset: general.datetime,
        humidity: general.percentage,
        clouds: general.percentage,
        windDeg: direction.bearing,
        weather: weatherTransform
    },
    tides: {
        heights: [
            {
                dt: general.datetime,
                height: distance.metres
            }
        ],
        extremes: [
            {
                dt: general.datetime,
                height: distance.metres
            }
        ]
    },
    radar: {
        timestamps: [
            general.datetime
        ]
    }
};

export default {
    [UNITS.metric]: objectMerge(BASE_FORMATS, {
        current: {
            temp: temperature.celcius,
            feelsLike: temperature.celcius,
            pressure: pressure.hectopascals,
            dewPoint: temperature.celcius,
            visibility: distance.metres,
            windSpeed: speed.metresPerSecond,
        },
        daily: [
            {
                dt: general.datetime,
                sunrise: general.datetime,
                sunset: general.datetime,
                temp: {
                    day: temperature.celcius,
                    min: temperature.celcius,
                    max: temperature.celcius,
                    night: temperature.celcius,
                    eve: temperature.celcius,
                    morn: temperature.celcius
                },
                feelsLike: {
                    day: temperature.celcius,
                    night: temperature.celcius,
                    eve: temperature.celcius,
                    morn: temperature.celcius
                },
                pressure: pressure.hectopascals,
                humidity: general.percentage,
                dewPoint: temperature.celcius,
                windSpeed: speed.metresPerSecond,
                windDeg: direction.bearing,
                weather: weatherTransform,
                clouds: general.percentage,
                rain: distance.millimeters,
                pop: general.fractional
            }
        ],
        hourly: [
            {
                dt: general.datetime,
                temp: temperature.celcius,
                feelsLike: temperature.celcius,
                pressure: pressure.hectopascals,
                humidity: general.percentage,
                dewPoint: temperature.celcius,
                clouds: general.percentage,
                visibility: distance.metres,
                windSpeed: speed.metresPerSecond,
                windDeg: direction.bearing,
                pop: general.fractional,
                weather: weatherTransform,
            }
        ]
    }),
    [UNITS.imperial]: objectMerge(BASE_FORMATS, {
        current: {
            temp: temperature.fahrenheit,
            feelsLike: temperature.fahrenheit,
            pressure: pressure.millibars,
            dewPoint: temperature.fahrenheit,
            visibility: distance.miles,
            windSpeed: speed.milesPerHour,
        },
        daily: [
            {
                dt: general.datetime,
                sunrise: general.datetime,
                sunset: general.datetime,
                temp: {
                    day: temperature.fahrenheit,
                    min: temperature.fahrenheit,
                    max: temperature.fahrenheit,
                    night: temperature.fahrenheit,
                    eve: temperature.fahrenheit,
                    morn: temperature.fahrenheit
                },
                feelsLike: {
                    day: temperature.fahrenheit,
                    night: temperature.fahrenheit,
                    eve: temperature.fahrenheit,
                    morn: temperature.fahrenheit
                },
                pressure: pressure.millibars,
                humidity: general.percentage,
                dewPoint: temperature.fahrenheit,
                windSpeed: speed.milesPerHour,
                windDeg: direction.bearing,
                weather: weatherTransform,
                clouds: general.percentage,
                rain: distance.inches,
                pop: general.fractional
            }
        ],
        hourly: [
            {
                dt: general.datetime,
                temp: temperature.fahrenheit,
                feelsLike: temperature.fahrenheit,
                pressure: pressure.millibars,
                humidity: general.percentage,
                dewPoint: temperature.fahrenheit,
                clouds: general.percentage,
                visibility: distance.miles,
                windSpeed: speed.milesPerHour,
                windDeg: direction.bearing,
                pop: general.fractional,
                weather: weatherTransform
            }
        ]
    })
}