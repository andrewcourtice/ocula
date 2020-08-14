<template>
    <transition name="modal">
        <div class="modal" layout="row center-center" v-if="isOpen" @click.self.stop="close()">
            <div class="modal__body" :self="size">
                <slot :open="open" :close="close" :cancel="cancel"></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import useLayer from '../compositions/layer';

export default defineComponent({

    props: {

        id: {
            type: String
        },

        size: {
            type: String,
            default: 'size-small'
        } 

    },

    setup(props, context) {
        const {
            isOpen,
            close,
            cancel
        } = useLayer(props.id, context);

        return {
            isOpen,
            open,
            close,
            cancel
        };
    }
});
</script>

<style lang="scss">

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: var(--spacing__medium);
        background-color: rgba(0, 0, 0, 0.5);
        overflow: hidden;
        z-index: 100;
    }

    .modal__body {
        max-height: 100%;
        padding: var(--spacing__medium);
        background-color: var(--background__colour);
        border-radius: var(--border__radius--large);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;

        & .modal__body {
            transform: scale(0.75, 0.75);
        }
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity var(--transition__timing) var(--transition__easing--default);

        & .modal__body {
            transition: transform var(--transition__timing) var(--transition__easing--default);
        }
    }

</style>