<template>
    <transition name="drawer">
        <div class="drawer" v-if="isOpen" @click.self="close()">
            <aside class="drawer__panel" :class="panelClass">
                <slot :open="open" :close="close"></slot>
            </aside>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import useLayer from '../../compositions/layer';

export default defineComponent({

    props: {

        id: {
            type: String
        },

        position: {
            type: String,
            default: 'left'
        }

    },

    setup(props, context) {
        const {
            isOpen,
            open,
            close
        } = useLayer(props.id, context);

        const panelClass = computed(() => `drawer__panel--${props.position}`);

        return {
            isOpen,
            open,
            close,
            panelClass
        };
    }

});
</script>

<style lang="scss">

    .drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .drawer__panel {
        position: absolute;
        background-color: var(--background__colour);
    }

    .drawer__panel--left,
    .drawer__panel--right {
        top: 0;
        height: 100%;
        max-width: 80%;
    }

    .drawer__panel--top,
    .drawer__panel--bottom {
        left: 0;
        width: 100%;
        max-height: 80%;
    }

    .drawer__panel--left {
        left: 0;
    }

    .drawer__panel--right {
        right: 0;
    }

    .drawer__panel--top {
        top: 0;
    }

    .drawer__panel--bottom {
        bottom: 0;
    }

    .drawer-enter-from,
    .drawer-leave-to {
        background-color: transparent;

        & .drawer__panel--left {
            transform: translateX(-100%);
        }

        & .drawer__panel--right {
            transform: translateX(100%);
        }

        & .drawer__panel--top {
            transform: translateY(-100%);
        }

        & .drawer__panel--bottom {
            transform: translateY(100%);
        }
    }

    .drawer-enter-active,
    .drawer-leave-active {
        transition: background var(--transition__timing--long) var(--transition__easing--default);

        & .drawer__panel {
            transition: transform var(--transition__timing--long) var(--transition__easing--default);
        }
    }

</style>