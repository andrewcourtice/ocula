

<script lang="ts">
import useLayer from './compositions/layer';

import {
    defineComponent,
    watch
} from 'vue';

import {
    TileLayer
} from 'leaflet';

export default defineComponent({

    props: {

        id: {
            type: String
        },

        url: {
            type: String
        },

        opacity: {
            type: Number,
            default: 1
        }

    },
   
    setup(props, { attrs }) {
        const {
            class: className
        } = attrs;

        const layer = new TileLayer(props.url, {
            className,
            id: props.id,
            opacity: props.opacity
        });

        useLayer(layer);

        watch(() => props.opacity, value => layer.setOpacity(value));
    },

    render() {
        return null;
    }

});
</script>