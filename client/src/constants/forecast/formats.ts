import UNITS from '../../enums/forecast/units';

import FORMATTERS, {
    defaultFormatter
} from './formatters';

import {
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

export default {
    [UNITS.metric]: {
        current: {
            dt: general.datetime,
            sunrise: general.datetime,
            sunset: general.datetime,
            temp: temperature.celcius,
            feelsLike: temperature.celcius,
            pressure: pressure.hectopascals,
            humidity: general.percentage,
            dewPoint: temperature.celcius,
            clouds: general.percentage,
            visibility: distance.metres,
            windSpeed: speed.metresPerSecond,
            windDeg: direction.bearing,
            weather: weatherTransform
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
    },
    [UNITS.imperial]: {
        current: {
            dt: general.datetime,
            sunrise: general.datetime,
            sunset: general.datetime,
            temp: temperature.fahrenheit,
            feelsLike: temperature.fahrenheit,
            pressure: pressure.millibars,
            humidity: general.percentage,
            dewPoint: temperature.fahrenheit,
            clouds: general.percentage,
            visibility: distance.miles,
            windSpeed: speed.milesPerHour,
            windDeg: direction.bearing,
            weather: weatherTransform
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

    }
}