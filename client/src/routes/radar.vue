<template>
    <weather-layout class="route radar-master">
        <router-view />
    </weather-layout>    
</template>

<script lang="ts">
import WeatherLayout from '../components/layouts/weather.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        WeatherLayout
    }

});
</script>