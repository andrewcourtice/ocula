export interface ICoordinate {
    latitude: number;
    longitude: number;
}

export interface ILocation extends ICoordinate {
    id: string;
    shortName: string;
    longName: string;
}