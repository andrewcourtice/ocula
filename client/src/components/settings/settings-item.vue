<template>
    <div class="settings-item" layout="row center-justify" ref="item" @click="click">
        <div>{{ label }}</div>
        <div class="text--meta">{{ value }}</div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from "vue";

export default defineComponent({
    
    props: {

        label: {
            type: String
        },

        value: {
            type: null
        }

    },

    setup(props, { emit }) {
        const item = ref<Element>(null);

        function click(event: MouseEvent) {
            const select = item.value.querySelector('select');

            if (select) {
                select.click();
            }

            emit('selected', event);
        }

        return {
            item,
            click
        };
    }

});
</script>

<style lang="scss">

    .settings-item {

        & select {
            display: none;
        }
    }

</style>