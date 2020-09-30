import fetch from 'node-fetch';

import camelCaseKeys from '../_helpers/camel-case-keys';

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

    const owmApiKey = process.env.OWM_API_KEY;
    const worldtidesApiKey = process.env.WORLDTIDES_API_KEY;

    const responses = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/onecall?appid=${owmApiKey}&lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely`),
        fetch(`https://www.worldtides.info/api/v2?heights&extremes&date=today&days=1&step=3600&lat=${latitude}&lon=${longitude}&key=${worldtidesApiKey}`),
        fetch('https://tilecache.rainviewer.com/api/maps.json')
    ]);

    let [
        forecast,
        tides,
        timestamps
    ] = await Promise.all(responses.map(response => response.json()));

    forecast = camelCaseKeys(forecast);

    return response.json({
        ...forecast,
        tides,
        radar: {
            timestamps
        }
    });
}