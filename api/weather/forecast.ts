import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    let {
        latitude,
        longitude,
        units
    } = request.query;

    units = units || 'si';

    const apiKey = process.env.DARKSKY_API_KEY;
    const apiResponse = await fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,flags&units=${units}`);
    const data = await apiResponse.json();

    return response.json(data);
}