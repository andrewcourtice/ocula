import FORECASTS from './_constants/forecasts';
import TRANSFORMERS from './_transformers/index';

import fetch from 'node-fetch';
import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

import mapForecastData from './_helpers/map-forecast-data';

import {
    NowRequest,
    NowResponse
} from '@now/node';

async function getPrecis(apiKey, locationId) {
    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?regionPrecis=true&days=1`);
    const data = await apiResponse.json();

    const {
        days
    } = data.regionPrecis;

    const entries = TRANSFORMERS[FORECASTS.precis](days)[0];

    return entries.map(entry => entry.precis);
}

async function getObservations(apiKey, locationId) {
    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?observational=true`);
    const data = await apiResponse.json();

    const {
        observations
    } = data.observational;

    return observations;
}

async function getForecasts(apiKey, locationId) {
    const forecasts = [
        FORECASTS.weather,
        FORECASTS.rainfall,
        FORECASTS.sunriseSunset,
        FORECASTS.tides,
        FORECASTS.uv
    ];

    const forecastQuery = forecasts.join(',');

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?forecasts=${forecastQuery}&days=1`);
    const data = await apiResponse.json();

    return mapForecastData(data.forecasts);
}

function consolidateOutput(precis, observations, forecasts) {
    const {
        temperature,
        humidity,
        dewPoint,
        pressure,
        wind,
        rainfall
    } = observations;

    const {
        weather,
        sunrisesunset,
        uv,
        rainfall: forecastRainfall
    } = forecasts;

    const uvMin = minBy<any>(uv, entry => entry.index);
    const uvMax = maxBy<any>(uv, entry => entry.index);

    return {
        humidity: humidity.percentage,
        dewPoint: dewPoint.temperature,
        pressure: pressure.pressure,
        precis: {
            code: weather.precisCode,
            summary: weather.precis,
            descriptions: precis
        },
        temperature: {
            min: weather.min,
            max: weather.max,
            current: temperature.temperature,
            apparent: temperature.apparentTemperature,
        },
        rainfall: {
            today: rainfall.todayAmount,
            lastHour: rainfall.lastHourAmount,
            since9Am: rainfall.since9AMAmount,
            probability: forecastRainfall.probability
        },
        wind: {
            speed: wind.speed,
            gust: wind.gustSpeed,
            angle: wind.direction,
            direction: wind.directionText,
        },
        sun: {
            rise: sunrisesunset.riseDateTime,
            set: sunrisesunset.setDateTime,
            firstLight: sunrisesunset.firstLightDateTime,
            lastLight: sunrisesunset.lastLightDateTime,
        },
        uv: {
            min: uvMin,
            max: uvMax
        }
    };
}

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;
    
    const {
        location
    } = request.query;

    const [
        precis,
        observations,
        forecasts
    ] = await Promise.all([
        getPrecis(apiKey, location),
        getObservations(apiKey, location),
        getForecasts(apiKey, location)
    ]);

    const output = consolidateOutput(precis, observations, forecasts);

    return response.json(output);
}