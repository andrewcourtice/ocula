const IS_LOCAL = process.env.NODE_ENV === 'development';

export async function getOutlook(locationId: number) {
    if (IS_LOCAL) {
        return import(/* webpackChunkName: 'mock-data' */ './_data/outlook.json');
    }

    const response = await fetch(`/api/weather/outlook?location=${locationId}`);

    return response.json();
}

export async function getRadar(locationId: number, width: number = 256) {
    if (IS_LOCAL) {
        return import(/* webpackChunkName: 'mock-data' */ './_data/radar.json');
    }

    const response = await fetch(`/api/weather/radar?location=${locationId}&width=${width}`);
    
    return response.json();
}

export async function getForecast(locationId: number) {
    const response = await fetch(`/api/weather/forecast?location=${locationId}`);

    return response.json();
}
