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
    toRefs,
    PropType
} from 'vue';

interface ITileSource {
    tiles: string[];
    tileSize: number;
    minzoom: number;
    maxzoom: number;
}

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

    setup(props) {
        let map: mapboxgl.Map;

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
            map.setStyle(`mapbox://styles/mapbox/${STYLE[style]}`)
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

            map.style.sourceCaches['ocula-tile-source'].clearTiles()
            map.style.sourceCaches['ocula-tile-source'].update(map.transform);

            console.log()

            map.triggerRepaint();
        }

        function addSource(tiles: string[] = [''], tileSize: number = 256) {
            map.addSource('ocula-tile-source', {
                type: 'raster',
                tiles: [].concat(tiles),
                tileSize
            });

            return map.getSource('ocula-tile-source') as mapboxgl.RasterSource;
        }

        function addLayer(minzoom: number = 0, maxzoom: number = 22) {
            const layers = map.getStyle().layers;
            const firstLayer = layers.find(layer => layer.type === 'symbol');

            map.addLayer({
                id: 'ocula-tile-layer',
                type: 'raster',
                source: 'ocula-tile-source',
                minzoom,
                maxzoom
            }, firstLayer.id);

            return map.getLayer('ocula-tile-layer');
        }

        function setDefaultLayer(tileSource: ITileSource) {
            if (!tileSource || !map) {
                return;
            }

            let source = map.getSource('ocula-tile-source') as mapboxgl.RasterSource;
            let layer = map.getLayer('ocula-tile-layer');

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
        });

        watch([
            () => props.latitude,
            () => props.longitude,
            () => props.zoom
        ], updateLocation);

        watch(() => props.style, updateStyle);
        watch(() => props.tileSource, updateTileSource);

        return {
            element,
            loading
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