import ICON from '../../constants/icon';

import {
    dateFromUnix
} from "@ocula/utilities";

export function mapDayData(day) {
    let {
        time,
        icon,
        temperatureMin,
        temperatureMax,
        humidity,
        precipProbability,
        precipType,
        pressure,
        summary,
        sunriseTime,
        sunsetTime,
        uvIndex,
        windSpeed
    } = day;

    time = dateFromUnix(time);
    icon = ICON[icon];
    temperatureMin = Math.round(temperatureMin);
    temperatureMax = Math.round(temperatureMax);
    sunriseTime = dateFromUnix(sunriseTime);
    sunsetTime = dateFromUnix(sunsetTime);

    return {
        time,
        icon,
        temperatureMin,
        temperatureMax,
        humidity,
        precipProbability,
        precipType,
        pressure,
        summary,
        sunriseTime,
        sunsetTime,
        uvIndex,
        windSpeed
    }; 
}

export function mapHourData(hour) {
    let {
        time,
        icon,
        humidity,
        precipProbability,
        temperature,
        uvIndex,
        windSpeed
    } = hour;

    time = dateFromUnix(time);
    icon = ICON[icon];
    temperature = Math.round(temperature);

    return {
        time,
        icon,
        humidity,
        precipProbability,
        temperature,
        uvIndex,
        windSpeed 
    };    
}