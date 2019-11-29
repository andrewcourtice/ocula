export interface IGeocodeProperties {
    wikidata: string;
}

export interface IGeocodeGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeocodeContext {
    id: string;
    text: string;
    wikidata: string;
    short_code: string;
}

export interface IGeocodeFeature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: IGeocodeProperties;
    text: string;
    place_name: string;
    bbox: number[];
    center: number[];
    geometry: IGeocodeGeometry;
    context: IGeocodeContext[];
}

export interface IGeocodeResponse {
    type: string;
    query: string[];
    features: IGeocodeFeature[];
    attribution: string;
}