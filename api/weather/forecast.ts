import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const {
        latitude,
        longitude
    } = request.query;

    const apiKey = process.env.DARKSKY_API_KEY;
    const apiResponse = await fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,flags`);
    const data = await apiResponse.json();

    return response.json(data);
}