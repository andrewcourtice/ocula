<template>
    <div class="radar" ref="element">
        <loader class="radar__loader" v-if="loading" />
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    watch,
    onMounted,
    toRefs
} from 'vue';

const STYLE = {
    light: 'light-v10',
    dark: 'dark-v10',
    streets: 'streets-v10'
};

export default defineComponent({

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

        timestamps: {
            type: Array
        },

        interactive: {
            type: Boolean,
            default: false
        },

        carouselEnabled: {
            type: Boolean,
            default: false
        },

        carouselInterval: {
            type: Number,
            default: 3000
        }

    },

    setup(props) {
        let map;
        let index = 0;
        let intervalHandle;

        const element = ref<Element>(null);
        const loading = ref(false);

        function getTileUrl(index) {
            const timestamp = props.timestamps[index] || props.timestamps[0];
            return `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/0_0.png`;
        }
        
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

        function startCarousel() {
            index = 0;

            setInterval(() => {
                if (index === props.timestamps.length - 1) {
                    index = 0;
                }

                const source = map.getSource('raster-tile');

                source.tiles = [getTileUrl(index)];

                map.style.sourceCaches['raster-tile'].clearTiles()
                map.style.sourceCaches['raster-tile'].update(map.transform);
                map.triggerRepaint();

                index++;
            }, props.carouselInterval);
        }

        function stopCarousel() {
            intervalHandle && window.clearInterval(intervalHandle);
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

        function updateStyle(style) {
            map.setStyle(`mapbox://styles/mapbox/${STYLE[style]}`)
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

            const latestTimestamp = props.timestamps[props.timestamps.length - 1];

            map.on('load', () => {
                const layers = map.getStyle().layers;
                const firstLayer = layers.find(layer => layer.type === 'symbol');

                map.addSource('raster-tile', {
                    type: 'raster',
                    tiles: [getTileUrl(latestTimestamp)],
                    tileSize: 256
                });

                map.addLayer({
                    id: "simple-tiles",
                    type: "raster",
                    source: 'raster-tile',
                    minzoom: 0,
                    maxzoom: 22
                }, firstLayer.id);

                if (props.carouselEnabled) {
                    startCarousel();
                }

            });
        });

        watch([
            () => props.latitude,
            () => props.longitude,
            () => props.zoom
        ], updateLocation);

        watch(() => props.style, updateStyle);

        watch(() => props.carouselEnabled, value => (value ? startCarousel : stopCarousel)());

        return {
            element,
            loading
        };
    },

    // data() {
    //     return {
    //         loading: true,

    //         map: null,
    //         index: 0,
    //         intervalHandle: null
    //     };
    // },

    // methods: {

    //     getTileUrl(index) {
    //         const timestamp = this.timestamps[index] || this.timestamps[0];
    //         return `https://tilecache.rainviewer.com/v2/radar/${timestamp}/256/{z}/{x}/{y}/2/0_0.png`;
    //     },

    //     startCarousel() {
    //         this.index = 0;

    //         setInterval(() => {
    //             if (this.index === this.timestamps.length - 1) {
    //                 this.index = 0;
    //             }

    //             const source = this.map.getSource('raster-tile');

    //             source.tiles = [this.getTileUrl(this.index)];

    //             this.map.style.sourceCaches['raster-tile'].clearTiles()
    //             this.map.style.sourceCaches['raster-tile'].update(this.map.transform);
    //             this.map.triggerRepaint();

    //             this.index++;
    //         }, this.carouselInterval);
    //     },

    //     stopCarousel() {
    //         this.intervalHandle && window.clearInterval(this.intervalHandle);
    //     },

    //     updateLocation() {
    //         if (!this.map) {
    //             return;
    //         }

    //         this.map.easeTo({
    //             zoom: this.zoom,
    //             center: [
    //                 this.longitude,
    //                 this.latitude
    //             ]
    //         });
    //     },

    //     async loadMapbox() {
    //         this.loading = true;

    //         try {
    //             const mapboxModule = await import(/* webpackChunkName: 'mapbox' */ 'mapbox-gl');
    //             const mapboxgl = mapboxModule.default;

    //             mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

    //             return mapboxgl;
    //         } finally {
    //             this.loading = false;
    //         }
    //     }

    // },

    // async mounted() {
    //     const mapboxgl = await this.loadMapbox();

    //     const map = new mapboxgl.Map({
    //         container: this.$el,
    //         style: `mapbox://styles/mapbox/${STYLE[this.style]}`,
    //         zoom: this.zoom,
    //         interactive: this.interactive,
    //         center: [
    //             this.longitude,
    //             this.latitude
    //         ]
    //     });

    //     this.map = map;

    //     if (!this.timestamps) {
    //         return;
    //     }
        
    //     const latestTimestamp = this.timestamps[this.timestamps.length - 1];

    //     map.on('load', () => {
            
    //         const layers = map.getStyle().layers;
    //         const firstLayer = layers.find(layer => layer.type === 'symbol');

    //         map.addSource('raster-tile', {
    //             type: 'raster',
    //             tiles: [this.getTileUrl(latestTimestamp)],
    //             tileSize: 256
    //         });

    //         map.addLayer({
    //             id: "simple-tiles",
    //             type: "raster",
    //             source: 'raster-tile',
    //             minzoom: 0,
    //             maxzoom: 22
    //         }, firstLayer.id);

    //         if (this.carouselEnabled) {
    //             this.startCarousel();
    //         }

    //     });
    // },

    // watch: {

    //     latitude() {
    //         this.updateLocation();
    //     },

    //     longitude() {
    //         this.updateLocation();
    //     },

    //     zoom() {
    //         this.updateLocation();
    //     },

    //     carouselEnabled(value) {
    //         value ? this.startCarousel() : this.stopCarousel();
    //     }

    // }

});
</script>

<style lang="scss">

    .radar {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .radar__loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

</style>