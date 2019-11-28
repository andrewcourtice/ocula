import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.API_KEY;

    const apiResponse = await fetch(`https://api.darksky.net/forecast/${apiKey}/37.8267,-122.4233`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await apiResponse.json();

    return response.json(data);
}