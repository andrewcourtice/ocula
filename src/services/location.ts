import ILocation from '../../interfaces/location';

export async function searchLocations(query: string): Promise<ILocation[]> {
    const response = await fetch(`/api/location/search?query=${query}`);

    return response.json();
}

export async function getLocationById(locationId: number): Promise<ILocation> {
    const response = await fetch(`/api/location/id?location=${locationId}`);

    return response.json();
}

export async function getLocationByCoordinates(latitude: number, longitude: number): Promise<ILocation> {
    const response = await fetch(`/api/location/coordinates?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}