<template>
    <transition name="sidebar">
        <div class="sidebar" v-if="showing" @click.self="close">
            <aside class="sidebar__panel" :class="panelClass">
                <slot></slot>
            </aside>
        </div>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

    props: {

        position: {
            type: String,
            default: 'left'
        }

    },
    
    data() {
        return {
            showing: false
        };
    },

    computed: {

        panelClass() {
            return `sidebar__panel--${this.position}`;
        }

    },

    methods: {

        open() {
            this.showing = true; 
        },

        close() {
            this.showing = false;
        }

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
        background-color: rgba(0, 0, 0, 0.25);
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

    .sidebar-enter,
    .sidebar-leave-to {
        opacity: 0.75;

        & .sidebar__panel--left {
            transform: translateX(-100%);
        }

        & .sidebar__panel--right {
            transform: translateX(100%);
        }
    }

    .sidebar-enter-active,
    .sidebar-leave-active {
        transition: opacity var(--transition__timing) var(--transition__easing-quartic-out);

        & .sidebar__panel {
            transition: transform var(--transition__timing) var(--transition__easing-quartic-out);
        }
    }

</style>