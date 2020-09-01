<template>
    <div class="search-box" layout="row center-justify">
        <icon name="search" class="margin__right--small"/>
        <div self="size-x1">
            <input type="text" class="search-box__input" autocomplete="off" v-model="content" v-bind="$attrs">
        </div>
        <loader class="margin__left--small" v-show="loading"/>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from 'vue';

export default defineComponent({
    
    props: {

        modelValue: {
            type: null
        },

        loading: {
            type: Boolean,
            default: false
        }

    },

    setup(props, { emit }) {
        const content = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            }
        });

        return {
            content
        };
    }

});
</script>

<style lang="scss">

    .search-box {
        display: inline-flex;
        padding: var(--spacing__x-small) var(--spacing__small);
        border: 1px solid var(--border__colour);
        border-radius: var(--border__radius);

        & .search-box__input {
            width: 100%;
            padding: 0;
            border: none;
        }
    }

</style>