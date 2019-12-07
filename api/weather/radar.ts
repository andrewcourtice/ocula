import fetch from 'node-fetch';

import {
    NowRequest,
    NowResponse
} from '@now/node';

const GLOBE_WIDTH = 256;

function calculateMapZoom(width: number, minLongitude: number, maxLongitude: number) {
    let angle = maxLongitude - minLongitude;

    if (angle < 0) {
        angle += 360;
    }

    const relativeZoom = width * 360 / angle;
    const absoluteZoom = relativeZoom / GLOBE_WIDTH;
    const zoomEstimate = Math.log(absoluteZoom / Math.LN2);

    return Math.round(zoomEstimate);
}

async function getMapImage(width: number, latitude: number, longitude: number, bounds) {
    const mapboxApiKey = process.env.MAPBOX_API_KEY;

    const {
        minLng,
        maxLng
    } = bounds;

    const zoom = calculateMapZoom(width, minLng, maxLng);

    return `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${longitude},${latitude},${zoom}/${width}x${width}?access_token=${mapboxApiKey}`;
}

async function getRadarData(location) {
    const willyWeatherApiKey = process.env.WILLYWEATHER_API_KEY;
    const response = await fetch(`https://api.willyweather.com.au/v2/${willyWeatherApiKey}/locations/${location}/maps.json?mapTypes=regional-radar&offset=-60&limit=30`);
    
    return response.json();
}

export default async function (request: NowRequest, response: NowResponse) {    
    const {
        location,
        width
    } = request.query;

    const {
        name,
        lat,
        lng,
        bounds,
        overlayPath,
        overlays
    } = await getRadarData(location);

    const map = await getMapImage(+width, lat, lng, bounds);

    const baseUrl = decodeURI(overlayPath);
    const images = overlays.map(({ dateTime, name }) => ({
        dateTime,
        source: baseUrl + name
    }));

    return response.json({
        name,
        map,
        images
    });
}