<template>
    <div class="app-layout">
        <div class="margin__bottom--small" layout="row center-justify">
            <div self="size-x1">
                <slot name="header"></slot>
            </div>
            <div class="app-layout__menu">
                <icon name="menu" @click.native="openOptions"></icon>
                <div class="app-layout__menu-dot" v-show="updateReady"></div>
            </div>
        </div>
        <slot></slot>
        <navigation-sidebar></navigation-sidebar>
    </div>
</template>

<script lang="ts">


import NavigationSidebar from '../sidebars/navigation.vue';

import applicationController from '../../../controllers/application';

export default {

    computed: {

        updateReady() {
            return applicationController.updateReady;
        }

    },

    methods: {

        openOptions() {
            applicationController.openNavigationSidebar();
        }

    },
    
    components: {
        NavigationSidebar
    }

};
</script>

<style lang="scss">

    .app-layout {
        padding: var(--spacing__large);
    }

    .app-layout__menu {
        position: relative;
    }

    .app-layout__menu-dot {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #41980A;
        border: 2px solid var(--background__colour);
    }

</style>