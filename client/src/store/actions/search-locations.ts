import {
    searchLocations
} from '../../services/location';

import type {
    ILocation
} from '../../interfaces/location';

export default async function (query: string): Promise<ILocation[]> {
    return searchLocations(query);
}