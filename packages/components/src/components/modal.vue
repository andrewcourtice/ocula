<template>
    <transition name="modal" v-on="$listeners">
        <div class="modal" layout="row center-center" v-if="showing" @click.self.stop="close">
            <div class="modal__body" :self="size">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
export default {

    props: {

        size: {
            type: String,
            default: 'size-small'
        }

    },

    data() {
        return {
            showing: false
        };
    },
    
    methods: {

        open() {
            this.showing = true;
        },

        close() {
            this.showing = false;
        }

    }

};
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
        border-radius: var(--border__radius);
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
        transition: opacity var(--transition__timing) var(--transition__easing-quartic-out);

        & .modal__body {
            transition: transform var(--transition__timing) var(--transition__easing-quartic-out);
        }
    }

</style>