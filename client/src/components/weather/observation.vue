<template>
    <div class="weather-observation" layout="row center-left">
        <icon class="margin__right--small" :name="icon" v-if="icon"/>
        <div class="text--truncate">
            <strong>
                <slot name="label">{{ label }}</slot>
            </strong>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    
    props: {

        icon: {
            type: String
        },

        label: {
            type: String
        }

    }

});
</script>

<style lang="scss">

    .weather-observation {
        display: inline-flex;
        width: auto;
        overflow: hidden;
        padding: var(--spacing__x-small) var(--spacing__small);
        background: var(--background__colour--hover);
        border-radius: var(--border__radius);
    }

</style>