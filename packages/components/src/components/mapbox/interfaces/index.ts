import type {
    AnyPaint,
    Layer,
    Layout
} from 'mapbox-gl';

export interface IInteractiveMap {
    addLayer(layer: Layer): void;
    removeLayer(layer: Layer): void;
    updateLayout(layerId: string, layout: Layout): void;
    updatePaint(layerId: string, paint: AnyPaint): void;
}