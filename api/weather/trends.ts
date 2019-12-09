import FORECASTS from './_constants/forecasts';

import fetch from 'node-fetch';
import mapForecastData from './_helpers/map-forecast-data';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;
    
    const {
        location
    } = request.query;

    const forecasts = [
        FORECASTS.rainfallProbability,
        FORECASTS.temperature,
        FORECASTS.uv,
        FORECASTS.wind
    ];

    const forecastQuery = forecasts.join(',')

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${location}/weather.json?forecasts=${forecastQuery}&days=1`);
    const data = await apiResponse.json();
    const output = mapForecastData(data.forecasts);

    return response.json(output);
}