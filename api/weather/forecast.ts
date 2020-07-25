import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@vercel/node';

export default async function (request: NowRequest, response: NowResponse) {
    let {
        latitude,
        longitude,
        units
    } = request.query;

    units = units || 'auto';

    const apiKey = process.env.DARKSKY_API_KEY;

    const responses = await Promise.all([
        fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely&units=${units}`),
        fetch('https://tilecache.rainviewer.com/api/maps.json')
    ]);

    const [
        forecast,
        timestamps
    ] = await Promise.all(responses.map(response => response.json()));

    return response.json({
        ...forecast,
        radar: {
            timestamps
        }
    });
}