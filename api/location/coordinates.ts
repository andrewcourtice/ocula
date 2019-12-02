import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.WILLYWEATHER_API_KEY;

    const {
        latitude,
        longitude
    } = request.query;

    if (!latitude || !longitude) {
        return response.statusCode = 500;
    }

    const apiResponse = await fetch(`https://api.willyweather.com.au/v2/${apiKey}/search.json?lat=${latitude}&lng=${longitude}&units=distance:km`);
    
    const { 
        location 
    } = await apiResponse.json();

    return response.json(location);
}