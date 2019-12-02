import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;

    const {
        location
    } = request.query;

    if (!location) {
        return response.statusCode = 500;
    }

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/locations/${location}.json`);
    const data = await apiResponse.json();

    return response.json(data);
}