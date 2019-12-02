import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;

    const {
        query
    } = request.query;

    if (!query) {
        return response.statusCode = 500;
    }

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/search.json?query=${query}`);
    const data = await apiResponse.json();

    return response.json(data);
}