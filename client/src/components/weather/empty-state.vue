<template>
    <div class="weather-empty-state">
        <h3>Welcome to Ocula</h3>
        <p>
            Get started by searching for a location
            or using your current GPS location.
        </p>
        <div layout="rows center-center">
            <button class="button button--primary margin__all--x-small" @click="searchLocation">Search for a location</button>
            <button class="button button--primary margin__all--x-small" @click="setCurrentLocation">Use my location</button>
        </div>
    </div>
</template>

<script lang="ts">
import applicationController from '../../controllers/application';

import {
    defineComponent
} from 'vue';

import {
    setCurrentLocation
} from '../../store';

export default defineComponent({

    setup() {
        return {
            setCurrentLocation,
            searchLocation: applicationController.setLocation
        };
    }

});
</script>

<style lang="scss">

    .weather-empty-state {
        padding: var(--spacing__large);
        text-align: center;
    }

</style>