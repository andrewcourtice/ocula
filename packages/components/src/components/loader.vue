<template>
    <div class="loader" :class="className"></div>
</template>

<script lang="ts">
export default {
    
    props: {

        disabled: {
            type: Boolean,
            default: false
        }

    },

    computed: {

        className() {
            if (!this.disabled) {
                return 'loader--loading';
            }
        }

    }

};
</script>

<style lang="scss">

    .loader {
        display: inline-block;
        position: relative;
        width: 1.5em;
        height: 1.5em;
        vertical-align: middle;

        &:before,
        &:after {
            display: block;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-width: 2px;
            border-style: solid;
            border-radius: 50%;
        }

        &:before {
            border-color: #DDDEDF;
        }

        &:after {
            border-color: transparent;
        }

    }

    .loader--loading {

        &:after {
            animation: loader 500ms infinite linear;
            border-right-color: var(--colour__primary);
        }
    }

    @keyframes loader {

        0% {
            transform: rotate(-90deg);
        }

        100% {
            transform: rotate(270deg);
        }

    }

</style>