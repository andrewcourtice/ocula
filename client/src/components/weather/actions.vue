<template>
    <div class="weather-actions" :class="actionsClass" layout="row center-justify">
        <div class="weather-actions__action weather-actions__action--location" layout="row center-left" @click="setLocation">
            <icon name="map-pin"/>
            <div class="margin__left--x-small" v-if="location">{{ location.shortName }}</div>
        </div>
        <div self="size-x1">
            <slot></slot>
        </div>
        <div class="weather-actions__action weather-actions__action--update" @click="update(true)">
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

        const location = computed(() => state.location);
        const actionsClass = computed(() => state.loading && 'weather-actions--loading');

        return {
            location,
            setLocation,
            update,
            actionsClass
        };
    }

});
</script>

<style lang="scss">

    .weather-actions {
        padding: var(--spacing__medium) var(--spacing__large);
    }

    .weather-actions--loading {

        & .weather-actions__action {
            pointer-events: none;
            cursor: not-allowed;
        }

        & .weather-actions__action--update {
            animation: rotate 750ms ease-out infinite;
        }
    }

    @keyframes rotate {

        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }

    }

</style>