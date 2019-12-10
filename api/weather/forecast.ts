import FORECASTS from './_constants/forecasts';

import fetch from 'node-fetch';

import mapForecastData from './_helpers/map-forecast-data';

import {
    NowRequest,
    NowResponse
} from '@now/node';

async function getPrecis(apiKey, locationId) {
    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?regionPrecis=true&days=7`);
    const data = await apiResponse.json();

    const {
        days
    } = data.regionPrecis;

    const {
        precis
    } = mapForecastData({
        [FORECASTS.precis]: { days }
    }, days => days);

    return precis;
}

async function getForecast(apiKey, locationId) {
    const forecasts = [
        FORECASTS.weather
    ];

    const forecastQuery = forecasts.join(',')

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${locationId}/weather.json?forecasts=${forecastQuery}&days=7`);
    const data = await apiResponse.json();

    const {
        weather
    } = mapForecastData(data.forecasts, days => days);

    return weather;
}

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;
    
    const {
        location
    } = request.query;

    const [
        precis,
        forecast
    ] = await Promise.all([
        getPrecis(apiKey, location),
        getForecast(apiKey, location)
    ]);

    const length = Math.min(forecast.length, precis.length);

    const output = Array.from({ length }, (value, index) => {
        const forecastItem = forecast[index];
        const precisItem = precis[index];
        const precisDescription = precisItem.map(item => item.precis);

        const {
            dateTime,
            precisCode,
            min,
            max,
            precis: precisSummary,
        } = forecastItem

        return {
            dateTime,
            temperature: {
                min,
                max
            },
            precis: {
                code: precisCode,
                summary: precisSummary,
                descriptions: precisDescription
            }
        };
    });

    return response.json(output);
}