<template>
    <div class="icon-button" :class="buttonClass" layout="row center-left" v-bind="$attrs">
        <icon class="icon-button__icon" :name="icon"></icon>
        <div class="icon-button__label" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Icon from '../icon/icon.vue';

import {
    defineComponent,
    computed,
    PropType
} from 'vue';

type Layout = 'horizontal' | 'vertical';

export default defineComponent({

    components: {
        Icon
    },
    
    props: {

        icon: {
            type: String
        },

        layout: {
            type: String as PropType<Layout>,
            default: 'horizontal'
        }

    },

    setup(props) {
        const buttonClass = computed(() => `icon-button--${props.layout}`);

        return {
            buttonClass
        };
    }

});
</script>

<style lang="scss">

    .icon-button {
        display: inline-flex;
        width: auto;
        padding: var(--spacing__x-small);
        cursor: pointer;
    }

    .icon-button__label {
        margin: 0 0 0 var(--spacing__x-small);
    }

    .icon-button--vertical {
        flex-direction: column;
        align-items: center;

        & .icon-button__label {
            margin: var(--spacing__x-small) 0 0 0;
        }
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