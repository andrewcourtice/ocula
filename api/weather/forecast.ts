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

    const responses = await Promise.all([
        fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?exclude=minutely,flags&units=${units}`),
        fetch('https://tilecache.rainviewer.com/api/maps.json')
    ]);

    const [
        forecast,
        timestamps
    ] = await Promise.all(responses.map(response => response.json()));

    const latestTimestamp = timestamps[timestamps.length - 1];

    const radar = {
        tileURL: `https://tilecache.rainviewer.com/v2/radar/${latestTimestamp}/256/{z}/{x}/{y}/2/0_0.png`
    };

    return response.json({
        ...forecast,
        radar
    });
}