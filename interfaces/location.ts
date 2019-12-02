export default interface ILocation {
    id: number;
    name: string;
    region: string;
    state: string;
    postcode: string;
    timeZone: string;
    lat: number;
    lng: number;
    typeId: number;
};