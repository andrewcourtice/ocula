import type {
    Layer
} from 'leaflet';

export interface IInteractiveMap {
    addLayer(layer: Layer): void;
    removeLayer(layer: Layer): void;
}