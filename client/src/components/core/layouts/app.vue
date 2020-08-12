<template>
    <div class="app-layout">
        <container>
            <div class="margin__bottom--small" layout="row center-justify">
                <div class="app-layout__menu">
                    <icon name="menu" @click.native="navigate"></icon>
                </div>
                <div self="size-x1">
                    <slot name="header"></slot>
                </div>
            </div>
            <slot></slot>
        </container>
    </div>
</template>

<script lang="ts">
import applicationController from '../../../controllers/application';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    setup() {
        return {
            navigate: applicationController.navigate
        };
    }

});
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