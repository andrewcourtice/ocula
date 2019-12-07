<template>
    <div class="radar">
        <template v-if="radar">
            <img :src="radar.map" :alt="radar.name" class="radar__map">
            <img v-for="(image, index) in radar.images" 
                v-show="isImageActive(index)" 
                class="radar__image"
                :key="image.dateTime" 
                :src="image.source" 
                :alt="radar.name">
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import weatherController from '../../../controllers/weather';

export default Vue.extend({

    props: {

        locationId: {
            type: Number
        }

    },

    data() {
        return {
            loading: true,
            currentImage: 0
        };
    },
   
    computed: {

        radar() {
            return weatherController.radar;
        }

    },

    methods: {

        startCarousel() {
            const count = this.radar.images.length - 1;

            setInterval(() => {
                if (this.currentImage >= count) {
                    this.currentImage = 0;
                }

                this.currentImage++;
            }, 500);
        },

        async load() {
            const locationId = this.locationId || weatherController.location.id;
            const width = this.$el.clientWidth;

            this.loading = true;

            try {
                await weatherController.loadRadar(locationId, width);
                await this.$nextTick();

                this.startCarousel();
            } finally {
                this.loading = false;
            }
        },

        isImageActive(index) {
            return index === this.currentImage;
        }

    },

    mounted() {
        this.load();
    }

});
</script>

<style lang="scss">

    .radar {
        position: relative;
        overflow: hidden;
    }

    .radar__map,
    .radar__image {
        display: block;
    }

    .radar__map {
        width: 100%;
    }

    .radar__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

</style>