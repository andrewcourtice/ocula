<template>
    <div class="block">
        <div class="block__header" v-if="$slots.title || title">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="block__body">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    
    props: {

        title: {
            type: String
        }

    }

});
</script>

<style lang="scss">

    .block__header,
    .block__body {
        padding: var(--spacing__small);
    }

    .block__header {
        text-align: center;
        text-transform: uppercase;
    }

</style>