import ICON from '../../constants/icon';

import {
    dateFromUnix
} from "@ocula/utilities";

export function mapCurrentData(current) {
    let {
        icon,
        temperature,
    } = current;

    icon = ICON[icon];
    temperature = Math.round(temperature);

    return {
        ...current,
        icon,
        temperature
    };
}

export function mapDayData(day) {
    let {
        time,
        icon,
        temperatureMin,
        temperatureMax,
        sunriseTime,
        sunsetTime
    } = day;

    time = dateFromUnix(time);
    icon = ICON[icon];
    temperatureMin = Math.round(temperatureMin);
    temperatureMax = Math.round(temperatureMax);
    sunriseTime = dateFromUnix(sunriseTime);
    sunsetTime = dateFromUnix(sunsetTime);

    return {
        ...day,
        time,
        icon,
        temperatureMin,
        temperatureMax,
        sunriseTime,
        sunsetTime
    }; 
}

export function mapHourData(hour) {
    let {
        time,
        icon,
        temperature
    } = hour;

    time = dateFromUnix(time);
    icon = ICON[icon];
    temperature = Math.round(temperature);

    return {
        ...hour,
        time,
        icon,
        temperature
    };    
}