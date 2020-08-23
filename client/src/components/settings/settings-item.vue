<template>
    <div class="settings-item" layout="row center-justify">
        <div>{{ label }}</div>
        <div class="text--meta">{{ value }}</div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    
    props: {

        label: {
            type: String
        },

        value: {
            type: null
        }

    }

});
</script>

<style lang="scss">

    .settings-item {
        position: relative;

        & select {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

</style>