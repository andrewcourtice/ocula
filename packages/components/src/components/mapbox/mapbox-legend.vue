<template>
    <div class="mapbox-legend" :class="legendClass">
        <div class="mapbox-legend__header" layout="row center-left">
            <icon-button :icon="buttonIcon" v-tooltip:right="legendToolip" @click="toggleOpen"></icon-button>
            <div class="margin__left--xx-small" v-show="isOpen">Legend</div>
        </div>
        <transition-box-resize class="mapbox-legend__body">
            <div class="mapbox-legend__legend" v-if="isOpen">
                <slot></slot>
            </div>
        </transition-box-resize>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed
} from 'vue';

export default defineComponent({
    
    setup() {
        const isOpen = ref(false);

        const legendClass = computed(() => isOpen.value && 'mapbox-legend--open');
        const legendToolip = computed(() => `${isOpen.value ? 'Hide' : 'Show'} Legend`);
        const buttonIcon = computed(() => isOpen.value ? 'close-line' : 'information-line');''

        function toggleOpen(): void {
            isOpen.value = !isOpen.value;
        }

        return {
            isOpen,
            legendClass,
            legendToolip,
            buttonIcon,
            toggleOpen
        };
    }

});
</script>

<style lang="scss">

    .mapbox-legend {
        position: absolute;
        top: var(--spacing__small);
        left: var(--spacing__small);
        padding: var(--spacing__x-small);
        background: none;
        border-radius: var(--border__radius);
        z-index: 1;
    }

    .mapbox-legend--open {
        max-height: calc(100% - var(--spacing__large));
        background: var(--background__colour);
        box-shadow: 0 2px 4px rgba(30, 30, 30, 0.1);
        overflow: hidden;
        overflow-y: auto;
    }

    .mapbox-legend__header {
        border-radius: var(--border__radius);
        background-color: var(--background__colour);
    }

    .mapbox-legend__legend {
        padding: var(--spacing__x-small);
    }

</style>