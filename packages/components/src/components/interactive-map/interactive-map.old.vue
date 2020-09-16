<template>
    <div class="map" ref="element">
        <loader class="map__loader" v-if="loading" />
    </div>
</template>

<script lang="ts">
import Loader from '../loader/loader.vue';

import {
    defineComponent,
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    PropType
} from 'vue';

interface ITileSource {
    tiles: string[];
    tileSize: number;
    minzoom: number;
    maxzoom: number;
}

const SOURCE_NAME = 'ocula-tile-source';
const LAYER_NAME = 'ocula-tile-layer';

const TILE_OPTIONS = {
    tiles: [''],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 22
};

const STYLE = {
    light: 'light-v10',
    dark: 'dark-v10',
    streets: 'streets-v10'
};

export default defineComponent({

    components: {
        Loader
    },

    props: {

        latitude: {
            type: Number
        },

        longitude: {
            type: Number
        },

        zoom: {
            type: Number,
            default: 6
        },

        style: {
            type: String,
            default: 'light',
            //validator: value => value in STYLE
        },

        tileSource: {
            type: Object as PropType<ITileSource>
        },

        interactive: {
            type: Boolean,
            default: true
        }

    },

    setup(props, { emit, attrs }) {
        let map: mapboxgl.Map;
        let updating = false;

        const element = ref<HTMLElement>(null);
        const loading = ref(false);
        
        async function loadMapbox() {
            loading.value = true;

            try {
                const [
                    mapboxModule
                ] = await Promise.all([
                    import(
                    /* webpackChunkName: 'mapbox' */
                    /* webpackPrefetch: true */
                    'mapbox-gl'),
                    import(
                    /* webpackChunkName: 'mapbox' */
                    /* webpackPrefetch: true */
                    'mapbox-gl/dist/mapbox-gl.css'),
                ]);
                    
                const mapboxgl = mapboxModule.default;

                mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

                return mapboxgl;
            } finally {
                loading.value = false;
            }
        }

        function updateLocation() {
            if (!map) {
                return;
            }

            map.easeTo({
                zoom: props.zoom,
                center: [
                    props.longitude,
                    props.latitude
                ]
            });
        }

        function updateStyle(style): void {
            map.setStyle(`mapbox://styles/mapbox/${STYLE[style]}`);            
        }

        function getTileSource(tileSource: ITileSource): ITileSource {
            return {
                ...TILE_OPTIONS,
                ...tileSource
            };
        }

        function updateTileSource(tileSource: ITileSource): void {
            if (!map) {
                return;
            }

            const mergedTileSource = getTileSource(tileSource);

            const {
                tiles,
                tileSize,
                minzoom,
                maxzoom
            } = mergedTileSource;

            const {
                source,
                layer
            } = setDefaultLayer(mergedTileSource);

            source.tiles = [].concat(tiles);
            source.tileSize = tileSize;

            layer.minzoom = minzoom;
            layer.maxzoom = maxzoom;

            map.style.sourceCaches[SOURCE_NAME].clearTiles();
            map.style.sourceCaches[SOURCE_NAME].update(map.transform);

            map.triggerRepaint();
        }

        function addSource(tiles: string[] = [''], tileSize: number = 256) {
            map.addSource(SOURCE_NAME, {
                type: 'raster',
                tiles: [].concat(tiles),
                tileSize
            });

            return map.getSource(SOURCE_NAME) as mapboxgl.RasterSource;
        }

        function addLayer(minzoom: number = 0, maxzoom: number = 22) {
            const layers = map.getStyle().layers;
            const firstLayer = layers.find(layer => layer.type === 'symbol');

            map.addLayer({
                id: LAYER_NAME,
                type: 'raster',
                source: SOURCE_NAME,
                minzoom,
                maxzoom
            }, firstLayer.id);

            return map.getLayer(LAYER_NAME);
        }

        function setDefaultLayer(tileSource: ITileSource) {
            if (!tileSource || !map) {
                return;
            }

            let source = map.getSource(SOURCE_NAME) as mapboxgl.RasterSource;
            let layer = map.getLayer(LAYER_NAME);

            const {
                tiles,
                tileSize,
                minzoom,
                maxzoom
            } = getTileSource(tileSource);

            if (!source) {
                source = addSource(tiles, tileSize);
            }

            if (!layer) {
                layer = addLayer(minzoom, maxzoom);
            }

            return {
                source,
                layer
            };
        }

        function handleListeners(invokee: Function): void {
            Object.keys(attrs)
                .filter(key => key.startsWith('on'))
                .forEach(key => {
                try {
                    invokee.call(map, key.replace(/^on/, '').toLowerCase(), attrs[key]);
                } catch (error) {
                    console.warn(error);
                }
            });
        }
    
        onMounted(async () => {
            const mapboxgl = await loadMapbox();

            map = new mapboxgl.Map({
                container: element.value,
                style: `mapbox://styles/mapbox/${STYLE[props.style]}`,
                zoom: props.zoom,
                interactive: props.interactive,
                center: [
                    props.longitude,
                    props.latitude
                ]
            });

            map.on('load', () => {
                if (props.tileSource) {
                    setDefaultLayer(props.tileSource);
                }
            });

            handleListeners(map.on);
        });

        onBeforeUnmount(() => handleListeners(map.off));

        watch([
            () => props.latitude,
            () => props.longitude,
            () => props.zoom
        ], updateLocation);

        watch(() => props.style, updateStyle);
        watch(() => props.tileSource, updateTileSource);

        return {
            element,
            loading,
            updateLocation
        };
    }

});
</script>

<style lang="scss">

    .map {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .map__loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

</style>