<template>
    <svg class="icon" :class="className">
        <use v-bind:xlink:href="href"/>
    </svg>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

export default defineComponent({

    props: {

        name: {
            type: String
        }

    },

    setup(props) {
        const href = computed(() => `/icons.svg#${props.name}`);
        const className = computed(() => `icon--${props.name}`);
    
        return {
            href,
            className
        };
    }

});
</script>

<style lang="scss">

    .icon {
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        fill: currentColor;
        stroke: none;
        vertical-align: middle;
    }

</style>