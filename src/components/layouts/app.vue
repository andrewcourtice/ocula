<template>
    <div class="app-layout">
        <div class="app-layout__top-bar" layout="row center-justify">
            <div>
                <i class="fas fa-bars" @click="openOptions"></i>
            </div>
            <div v-if="$scopedSlots.header" self="size-x1">
                <slot name="header"></slot>
            </div>
        </div>
        <slot></slot>
        <options-sidebar></options-sidebar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import OptionsSidebar from '../sidebars/options.vue';

import applicationController from '../../controllers/application';

export default Vue.extend({

    methods: {

        openOptions() {
            applicationController.openOptionsSidebar();
        }

    },
    
    components: {
        OptionsSidebar
    }

});
</script>

<style lang="scss">

    .app-layout__top-bar {
        margin-bottom: 2rem;
    }

</style>