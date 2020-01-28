import {
    ILocation
} from '../interfaces/location';

export async function searchLocations(query: string): Promise<ILocation[]> {
    const response = await fetch(`/api/location/search?query=${query}`);

    return response.json();
}

export async function getLocation(latitude: number, longitude: number): Promise<ILocation> {  
    const response = await fetch(`/api/location/coordinates?latitude=${latitude}&longitude=${longitude}`);

    return response.json();
}