<template>
    <app-layout class="route weather-master">
        <router-view></router-view>
        <locations-modal />
    </app-layout>
</template>

<script lang="ts">
import AppLayout from '../components/core/layouts/app.vue';
import LocationsModal from '../components/core/modals/location.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        AppLayout,
        LocationsModal
    }

});
</script>