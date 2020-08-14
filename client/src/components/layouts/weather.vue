<template>
    <div class="weather-layout">
        <slot v-if="hasLocationSet"></slot>
        <container v-else>
            <div class="weather-layout__empty-state">
                <img :src="logo" alt="Ocula">
                <h3>Welcome to Ocula</h3>
                <p>
                    Get started by searching for a location
                    or using your current GPS location.
                </p>
                <div layout="rows center-center">
                    <button class="button button--primary margin__all--x-small" @click="setLocation">Search for a location</button>
                    <button class="button button--primary margin__all--x-small" @click="setCurrentLocation">Use my location</button>
                </div>
            </div>
        </container>
    </div>
</template>

<script lang="ts">
import EVENTS from '../../constants/events';

import applicationController from '../../controllers/application';

import logo from '../../assets/images/logo/logo-192.svg';

import {
    defineComponent,
    computed,
    onMounted,
    onActivated,
    watch
} from 'vue';

import {
    state,
    update,
    setCurrentLocation
} from '../../store';

import {
    useSubscriber
} from '@ocula/components';

import {
    typeIsNil
} from '@ocula/utilities';

export default defineComponent({

    setup() {
        const hasLocationSet = computed(() => !typeIsNil(state.settings.location));

        const {
            setLocation
        } = applicationController;

        function updateForecast() {
            if (hasLocationSet.value) {
                update();
            }
        }

        onMounted(updateForecast);
        onActivated(updateForecast);
        
        watch(() => state.settings.location, updateForecast);

        useSubscriber(EVENTS.application.visible, updateForecast);
        
        return {
            logo,
            hasLocationSet,
            setLocation,
            setCurrentLocation
        };
    }

});
</script>

<style lang="scss">

    .weather-layout {
    }

    .weather-layout__empty-state {
        padding: var(--spacing__large);
        text-align: center;
    }

</style>