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

    units = units || 'metric';

    const apiKey = process.env.OWM_API_KEY;

    const responses = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=${units}`),
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