import {
    inject,
    onMounted,
    onUnmounted
} from 'vue';

import type {
    IInteractiveMap
} from '../interfaces';

import type {
    Layer
} from 'leaflet';

export default function useLayer(layer: Layer) {
    const map = inject<IInteractiveMap>('map');

    onMounted(() => map.addLayer(layer));
    onUnmounted(() => map.removeLayer(layer));

    return {
        map
    };
}