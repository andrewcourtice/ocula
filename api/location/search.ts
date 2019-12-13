import fetch from 'node-fetch';
import mapLocation from './_helpers/map-location';

import {
    NowRequest,
    NowResponse
} from '@now/node';

export default async function (request: NowRequest, response: NowResponse) {
    const {
        query
    } = request.query;

    const apiKey = process.env.MAPBOX_API_KEY;
    const apiResponse = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${apiKey}&types=locality,place&limit=10&autocomplete=true`);
    
    const {
        features
    } = await apiResponse.json();

    if (!features || features.length < 1) {
        response.statusCode = 500;
    }

    const output = features.map(mapLocation);

    return response.json(output);
}