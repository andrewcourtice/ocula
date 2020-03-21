<template>
    <section class="block">
        <div class="block__header" layout="row center-justify">
            <h2 class="block__title">
                <slot name="title">{{ title }}</slot>
            </h2>
            <slot name="header"></slot>
        </div>
        <slot></slot>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    
    props: {

        title: {
            type: String
        }

    }

});
</script>

<style lang="scss">

    .block {
        margin-bottom: var(--spacing__large);

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    .block__title {
        margin-bottom: var(--spacing__small);
        color: var(--font__colour--meta);
        font-size: var(--font__size);
        font-weight: var(--font__weight--medium);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

</style>