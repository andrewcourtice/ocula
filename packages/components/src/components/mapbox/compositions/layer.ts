import {
    inject,
    watch,
    onMounted,
    onBeforeUnmount,
    PropType
} from 'vue';

import {
    stringUniqueId
} from '@ocula/utilities';

import type {
    IInteractiveMap
} from '../interfaces';

import type {
    Layer,
    Layout,
    AnyPaint
} from 'mapbox-gl';

export const layerProps = {

    id: {
        type: String,
        default: () => stringUniqueId()
    },

    minzoom: {
        type: Number,
        default: 0
    },
    
    maxzoom: {
        type: Number,
        default: 22
    },

    layout: {
        type: Object as PropType<Layout>
    },

    paint: {
        type: Object as PropType<AnyPaint>
    }
    
};

export function useLayer(props: any, layer: Layer) {
    const map = inject<IInteractiveMap>('map');
      
    watch(() => props.layout, value => map.updateLayout(layer.id, value));
    watch(() => props.paint, value => map.updatePaint(layer.id, value));

    onMounted(() => map.addLayer(layer));
    onBeforeUnmount(() => map.removeLayer(layer));

    return {
        map
    };
}