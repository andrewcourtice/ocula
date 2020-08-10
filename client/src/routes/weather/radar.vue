<template>
    <div class="weather-radar-route">
        <radar class="weather-radar-route__radar"
            v-if="location && radar"
            :latitude="location.latitude" 
            :longitude="location.longitude"
            :timestamps="radar.timestamps"
            interactive>
        </radar>
    </div>
</template>

<script lang="ts">


import Radar from '../../components/weather/core/radar.vue';

import refreshable from './_base/refreshable';

import weatherController from '../../controllers/weather';

export default {
    
    extends: refreshable,

    computed: {

        location() {
            return weatherController.location;
        },

        radar() {
            return weatherController.radar;
        }

    },

    components: {
        Radar
    }

};
</script>