import ILocation from '../../interfaces/location';

const IS_LOCAL = process.env.NODE_ENV === 'development';

export async function searchLocations(query: string): Promise<ILocation[]> {
    const response = await fetch(`/api/location/search?query=${query}`);

    return response.json();
}

export async function getLocationById(locationId: number): Promise<ILocation> {
    if (IS_LOCAL) {
        return import(/* webpackChunkName: 'mock-data' */ './_data/location.json');
    }

    const response = await fetch(`/api/location/id?location=${locationId}`);

    return response.json();
}

export async function getLocationByCoordinates(latitude: number, longitude: number): Promise<ILocation> {
    console.log(process.env.NODE_ENV);
    if (IS_LOCAL) {
        return import(/* webpackChunkName: 'mock-data' */ './_data/location.json');
    }
    
    const response = await fetch(`/api/location/coordinates?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}