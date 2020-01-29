<template>
    <div class="search-box" layout="row center-justify">
        <icon name="search" class="margin__right--small"/>
        <div self="size-x1">
            <input type="text" class="search-box__input" v-model="content" v-bind="$attrs">
        </div>
        <loader class="margin__left--small" v-show="loading"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    
    props: {

        value: {
            type: null
        },

        loading: {
            type: Boolean,
            default: false
        }

    },

    computed: {

        content: {
            get() {
                return this.value;
            },
            set(value) {
                console.log(value);
                this.$emit('input', value);
            }
        }

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