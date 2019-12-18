const IS_LOCAL = process.env.NODE_ENV === 'development';

export async function searchLocations(query: string) {
    const response = await fetch(`/api/location/search?query=${query}`);

    return response.json();
}

export async function getLocation(latitude: number, longitude: number) {
    if (IS_LOCAL) {
        return import(/* webpackChunkName: 'mock-data' */ './_data/location.json');
    }
    
    const response = await fetch(`/api/location/coordinates?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}