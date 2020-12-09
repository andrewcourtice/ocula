import {
    searchLocations
} from '../../services/location';

import type {
    ILocation
} from '../../types/location';

export default async function (query: string): Promise<ILocation[]> {
    return searchLocations(query);
}