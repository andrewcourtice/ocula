<template>
    <div class="icon-label" layout="row center-left">
        <icon class="icon-label__icon" :name="icon"></icon>
        <div class="icon-label__label" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Icon from '../icon/icon.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        Icon
    },
    
    props: {

        icon: {
            type: String
        }

    }

});
</script>

<style lang="scss">

    .icon-label {
        display: inline-flex;
        width: auto;
    }

    .icon-label__label {
        margin-left: var(--spacing__x-small);
    }

</style>