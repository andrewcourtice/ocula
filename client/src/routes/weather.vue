<template>
    <app-layout class="route weather-master">
        <router-view></router-view>
        <button class="button" @click="editLocations">Open Locations</button>
        <locations-modal />
    </app-layout>
</template>

<script lang="ts">
import AppLayout from '../components/core/layouts/app.vue';
import LocationsModal from '../components/core/modals/location.vue';

import appController from '../controllers/application';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        AppLayout,
        LocationsModal
    },
    
    setup() {
        return {
            editLocations: appController.editLocations
        }
    }

});
</script>