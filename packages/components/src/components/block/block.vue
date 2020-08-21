<template>
    <section class="block">
        <div class="block__header" v-if="$slots.title || title">
            <div class="block__title">
                <slot name="title">{{ title }}</slot>
            </div>
        </div>
        <div class="block__body">
            <slot></slot>
        </div>
    </section>
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

    .block__title {
        font-size: var(--font__size--small);
        font-weight: var(--font__weight--heavy);
        text-transform: uppercase;
    }

</style>