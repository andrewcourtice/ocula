import UNITS from './units';
import FORMATS from './formats';

const {
    general,
    temperature,
    distance,
    speed,
    pressure,
    direction
} = FORMATS;

export const DEFAULT_UNIT_FORMAT = {
    apparentTemperature: temperature.celcius,
    apparentTemperatureHigh: temperature.celcius,
    apparentTemperatureHighTime: general.datetime,
    apparentTemperatureLow: temperature.celcius,
    apparentTemperatureLowTime: general.datetime,
    apparentTemperatureMax: temperature.celcius,
    apparentTemperatureMaxTime: general.datetime,
    apparentTemperatureMin: temperature.celcius,
    apparentTemperatureMinTime: general.datetime,

    cloudCover: general.percentage,
    dewPoint: temperature.celcius,
    humidity: general.percentage,
    icon: general.icon,

    nearestStormBearing: direction.bearing,
    nearestStormDistance: distance.kilometres,

    precipAccumulation: distance.centimetres,
    precipIntensity: speed.millimetresPerHour,
    precipIntensityMax: speed.millimetresPerHour,
    precipIntensityMaxTime: general.datetime,
    precipProbability: general.percentage,

    pressure: pressure.hectopascals,

    sunriseTime: general.datetime,
    sunsetTime: general.datetime,

    temperature: temperature.celcius,
    temperatureHigh: temperature.celcius,
    temperatureHighTime: general.datetime,
    temperatureLow: temperature.celcius,
    temperatureLowTime: general.datetime,
    temperatureMax: temperature.celcius,
    temperatureMaxTime: general.datetime,
    temperatureMin: temperature.celcius,
    temperatureMinTime: general.datetime,

    time: general.datetime,

    uvIndexTime: general.datetime,
    visibility: distance.kilometres,

    windBearing: direction.bearing,
    windGust: speed.metresPerSecond,
    windGustTime: general.datetime,
    windSpeed: speed.metresPerSecond
};

export default {
    [UNITS.ca]: {
        windGust: speed.kilometresPerHour,
        windSpeed: speed.kilometresPerHour
    },
    [UNITS.uk2]: {
        nearestStormDistance: distance.miles,
        visibility: distance.miles,
        windGust: speed.milesPerHour,
        windSpeed: speed.milesPerHour
    },
    [UNITS.us]: {
        apparentTemperature: temperature.fahrenheit,
        apparentTemperatureHigh: temperature.fahrenheit,
        apparentTemperatureLow: temperature.fahrenheit,
        apparentTemperatureMax: temperature.fahrenheit,
        apparentTemperatureMin: temperature.fahrenheit,
        dewPoint: temperature.fahrenheit,
        nearestStormDistance: distance.miles,

        precipIntensity: speed.inchesPerHour,
        precipIntensityMax: speed.inchesPerHour,

        pressure: pressure.millibars,

        temperature: temperature.fahrenheit,
        temperatureHigh: temperature.fahrenheit,
        temperatureLow: temperature.fahrenheit,
        temperatureMax: temperature.fahrenheit,
        temperatureMin: temperature.fahrenheit,

        visibility: distance.miles,

        windGust: speed.milesPerHour,
        windSpeed: speed.milesPerHour
    }
};