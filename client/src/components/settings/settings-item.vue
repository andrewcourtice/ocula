<template>
    <div class="settings-item" layout="row center-justify">
        <div class="settings-item__label">
            <slot name="label">{{ label }}</slot>
        </div>
        <div class="settings-item__value text--meta">
            <slot name="value">{{ value }}</slot>
        </div>
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