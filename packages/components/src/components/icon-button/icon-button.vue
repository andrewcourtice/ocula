<template>
    <div class="icon-button" layout="row center-left" v-bind="$attrs">
        <icon class="icon-button__icon" :name="icon"></icon>
        <div class="icon-button__label" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Icon from '../icon/icon.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        Icon
    },
    
    props: {

        icon: {
            type: String
        }

    }

});
</script>

<style lang="scss">

    .icon-button {
        display: inline-flex;
        width: auto;
        padding: var(--spacing__x-small) var(--spacing__small);
        cursor: pointer;
    }

    .icon-button__label {
        margin-left: var(--spacing__x-small);
    }

    @media (hover: hover) {

        .icon-button {
            border-radius: var(--border__radius);

            &:hover {
                background-color: var(--background__colour--hover);
            }
        }

    }

</style>