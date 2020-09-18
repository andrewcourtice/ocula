<script lang="ts">
import {
    layerProps,
    useLayer
} from './compositions/layer';

import {
    defineComponent,
    PropType
} from 'vue';

import type {
    Layer
} from 'mapbox-gl';

export default defineComponent({

    props: {

        ...layerProps,

        tiles: {
            type: Array as PropType<string[]>
        },

        tileSize: {
            type: Number,
            default: 256
        }

    },
   
    setup(props, { attrs }) {
        const {
            tiles,
            tileSize,
            ...base
        } = props;

        const layer: Layer = {
            ...base,
            type: 'raster',
            source: {
                tiles,
                tileSize,
                type: 'raster',
            }
        };

        useLayer(props, layer);
    },

    render() {
        return null;
    }

});
</script>