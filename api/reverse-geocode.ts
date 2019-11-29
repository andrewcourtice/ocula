import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

import {
    IGeocodeResponse
} from './_interfaces/geocode';

export default async function (request: NowRequest, response: NowResponse) {
    const apiKey = process.env.MAPBOX_API_KEY;

    const {
        latitude,
        longitude
    } = request.query;

    const apiResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}&types=locality`);
    const data: IGeocodeResponse = await apiResponse.json();
    
    const output = data.features.map(feature => ({
        name: feature.text,
        latitude: feature.center[0],
        longitude: feature.center[1]
    }));

    return response.json(output[0]);
}