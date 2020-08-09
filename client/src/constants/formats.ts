import UNITS from './units';
import FORMATS from './formatters';

const {
    general,
    temperature,
    distance,
    speed,
    pressure,
    direction,
    iteration
} = FORMATS;

export default {
    [UNITS.metric]: {
        current: iteration.object({
            dt: general.datetime,
            sunrise: general.datetime,
            sunset: general.datetime,
            temp: temperature.celcius,
            feels_like: temperature.celcius,
            pressure: pressure.hectopascals,
            humidity: general.percentage,
            dew_point: temperature.celcius,
    
            clouds: general.percentage,
            visibility: distance.kilometres,
            wind_speed: speed.kilometresPerHour,
            wind_deg: direction.bearing,
    
            weather: iteration.array({
                icon: general.icon
            })
        }),
    
        daily: iteration.array({
            dt: general.datetime,
            sunrise: general.datetime,
            sunset: general.datetime,
            temp: iteration.object({
                day: temperature.celcius,
                min: temperature.celcius,
                max: temperature.celcius,
                night: temperature.celcius,
                eve: temperature.celcius,
                morn: temperature.celcius
            }),
            feels_like: iteration.object({
                day: temperature.celcius,
                night: temperature.celcius,
                eve: temperature.celcius,
                morn: temperature.celcius
            }),
            pressure: pressure.hectopascals,
            humidity: general.percentage,
            dew_point: temperature.celcius,
            wind_speed: speed.kilometresPerHour,
            wind_deg: direction.bearing,
            weather: iteration.array({
                icon: general.icon
            }),
            clouds: general.percentage,
            rain: distance.millimeters,
            pop: general.percentage
        }),
    
        hourly: iteration.array({
            dt: general.datetime,
            temp: temperature.celcius,
            feels_like: temperature.celcius,
            pressure: pressure.hectopascals,
            humidity: general.percentage,
            dew_point: temperature.celcius,
            clouds: general.percentage,
            visibility: distance.kilometres,
            wind_speed: speed.kilometresPerHour,
            wind_deg: direction.bearing,
            pop: general.percentage,
            weather: iteration.array({
                icon: general.icon
            })
        })
    },
    [UNITS.imperial]: {
        current: iteration.object({
            dt: general.datetime,
            sunrise: general.datetime,
            sunset: general.datetime,
            temp: temperature.fahrenheit,
            feels_like: temperature.fahrenheit,
            pressure: pressure.millibars,
            humidity: general.percentage,
            dew_point: temperature.fahrenheit,
    
            clouds: general.percentage,
            visibility: distance.miles,
            wind_speed: speed.milesPerHour,
            wind_deg: direction.bearing,
    
            weather: iteration.array({
                icon: general.icon
            })
        }),

        daily: iteration.array({
            dt: general.datetime,
            sunrise: general.datetime,
            sunset: general.datetime,
            temp: iteration.object({
                day: temperature.fahrenheit,
                min: temperature.fahrenheit,
                max: temperature.fahrenheit,
                night: temperature.fahrenheit,
                eve: temperature.fahrenheit,
                morn: temperature.fahrenheit
            }),
            feels_like: iteration.object({
                day: temperature.fahrenheit,
                night: temperature.fahrenheit,
                eve: temperature.fahrenheit,
                morn: temperature.fahrenheit
            }),
            pressure: pressure.millibars,
            humidity: general.percentage,
            dew_point: temperature.fahrenheit,
            wind_speed: speed.milesPerHour,
            wind_deg: direction.bearing,
            weather: iteration.array({
                icon: general.icon
            }),
            clouds: general.percentage,
            rain: distance.inches,
            pop: general.percentage
        }),

        hourly: iteration.array({
            dt: general.datetime,
            temp: temperature.fahrenheit,
            feels_like: temperature.fahrenheit,
            pressure: pressure.millibars,
            humidity: general.percentage,
            dew_point: temperature.fahrenheit,
            clouds: general.percentage,
            visibility: distance.miles,
            wind_speed: speed.milesPerHour,
            wind_deg: direction.bearing,
            pop: general.percentage,
            weather: iteration.array({
                icon: general.icon
            })
        })

    }
}