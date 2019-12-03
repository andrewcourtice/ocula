import FORECASTS from './_constants/forecasts';
import TRANSFORMERS from './_transformers/index';

import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

async function getObservations(apiKey, locationId) {
    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?observational=true`);
    const data = await apiResponse.json();

    const {
        observations
    } = data.observational;

    return observations;
}

async function getCurrentOutlook(apiKey, locationId) {
    const forecasts = [
        FORECASTS.weather,
        FORECASTS.temperature,
        FORECASTS.rainfall,
        FORECASTS.rainfallProbability,
        FORECASTS.wind,
    ];

    const forecastQuery = forecasts.join(',')

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?forecasts=${forecastQuery}&days=1`);
    const data = await apiResponse.json();

    return forecasts.reduce((output, forecast) => {
        const value = data.forecasts[forecast];
        const transformer = TRANSFORMERS[forecast];

        if (!value || !value.days || value.days.length !== 1) {
            return output;
        }

        output[forecast] = transformer(value.days)[0];

        return output;
    }, {});
}

async function getWeekOutlook(apiKey, locationId) {
    const transformer = TRANSFORMERS[FORECASTS.weather];
    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?forecasts=weather&days=7`);
    const data = await apiResponse.json();

    const {
        weather
    } = data.forecasts;

    if (!weather || !weather.days || weather.days.length !== 7) {
        return [];
    }

    return transformer(weather.days);
}

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;
    
    const {
        location
    } = request.query;

    const [
        observations,
        current,
        week
    ] = await Promise.all([
        getObservations(apiKey, location),
        getCurrentOutlook(apiKey, location),
        getWeekOutlook(apiKey, location)
    ]);

    return response.json({
        observations,
        current,
        week
    });
}