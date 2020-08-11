import UNITS from './units';
import FORMATTERS from './formatters';

const {
    general,
    temperature,
    distance,
    speed,
    pressure,
    direction
} = FORMATTERS;

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
            visibility: distance.kilometres,
            windSpeed: speed.kilometresPerHour,
            windDeg: direction.bearing,

            weather: [
                {
                    icon: general.icon
                }
            ]
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
                windSpeed: speed.kilometresPerHour,
                windDeg: direction.bearing,
                weather: [
                    {
                        icon: general.icon
                    }
                ],
                clouds: general.percentage,
                rain: distance.millimeters,
                pop: general.percentage
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
                visibility: distance.kilometres,
                windSpeed: speed.kilometresPerHour,
                windDeg: direction.bearing,
                pop: general.percentage,
                weather: [
                    {
                        icon: general.icon
                    }
                ],
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

            weather: [
                {
                    icon: general.icon
                }
            ]
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
                weather: [
                    {
                        icon: general.icon
                    }
                ],
                clouds: general.percentage,
                rain: distance.inches,
                pop: general.percentage
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
                pop: general.percentage,
                weather: [
                    {
                        icon: general.icon
                    }
                ]
            }
        ]

    }
}