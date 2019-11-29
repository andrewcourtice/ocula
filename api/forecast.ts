import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

const DEFAULT_QUERY = {
    latitude: 42.3601,
    longitude: -71.0589,
    units: 'si'
};

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.DARKSKY_API_KEY;

    const {
        latitude,
        longitude,
        units
    } = {
        ...DEFAULT_QUERY,
        ...request.query
    };

    const apiResponse = await fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=${units}&exclude=minutely`);
    const data = await apiResponse.json();

    return response.json(data);
}