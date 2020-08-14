<template>
    <div class="weather-actions" layout="row center-justify">
        <div class="weather-actions__location" layout="row center-left" @click="setLocation">
            <icon name="map-pin"/>
            <div class="margin__left--x-small">{{ location.shortName }}</div>
        </div>
        <div self="size-x1">
            <slot name="header"></slot>
        </div>
        <div class="weather-actions__update" @click="update">
            <icon name="refresh-cw"/>
        </div>
    </div>
</template>

<script lang="ts">
import applicationController from '../../controllers/application';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    update
} from '../../store';

export default defineComponent({
   
    setup() {
        const {
            setLocation
        } = applicationController;

        const location = computed(() => state.location)

        return {
            location,
            setLocation,
            update
        };
    }

});
</script>

<style lang="scss">

    .weather-actions {
        padding: var(--spacing__large);
    }

</style>