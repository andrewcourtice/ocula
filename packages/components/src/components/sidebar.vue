<template>
    <transition name="sidebar">
        <div class="sidebar" v-if="isOpen" @click.self="close">
            <aside class="sidebar__panel" :class="panelClass">
                <slot></slot>
            </aside>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

import useLayer from '../compositions/layer';

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
            close
        } = useLayer(props.id, context);

        const panelClass = computed(() => `sidebar__panel--${props.position}`);

        return {
            isOpen,
            close,
            panelClass
        };
    }

});
</script>

<style lang="scss">

    .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .sidebar__panel {
        position: absolute;
        top: 0;
        width: 80%;
        height: 100%;
        max-width: 360px;
        background-color: var(--foreground__colour);
    }

    .sidebar__panel--left {
        left: 0;
    }

    .sidebar__panel--right {
        right: 0;
    }

    .sidebar-enter-from,
    .sidebar-leave-to {
        background-color: transparent;

        & .sidebar__panel--left {
            transform: translateX(-100%);
        }

        & .sidebar__panel--right {
            transform: translateX(100%);
        }
    }

    .sidebar-enter-active,
    .sidebar-leave-active {
        transition: background var(--transition__timing--long) var(--transition__easing-quartic-out);

        & .sidebar__panel {
            transition: transform var(--transition__timing--long) var(--transition__easing-quartic-out);
        }
    }

</style>