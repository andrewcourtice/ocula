<template>
    <i class="icon" :class="iconClass"></i>
</template>

<script lang="ts">
import Vue from 'vue';

const TYPE_MAP = {
    solid: 'fas',
    regular: 'far'
};

export default Vue.extend({
    
    props: {

        type: {
            type: String
        },

        name: {
            type: String
        }

    },

    computed: {

        iconClass() {
            const type = TYPE_MAP[this.type] || TYPE_MAP.solid;
            const name = `fa-${this.name}`

            return [
                type,
                name
            ];
        }

    }

});
</script>

<style lang="scss">

    .icon {
        min-width: 1em;
        font-size: 1.25em;
        text-align: center;
    }

</style>