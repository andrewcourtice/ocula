<template>
    <div class="settings-layout">
        <div class="settings-layout__header">
            <strong>{{ title }}</strong>
        </div>
        <div class="settings-layout__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {
    defineComponent
} from "vue";

export default defineComponent({
   
   props: {

       title: {
           type: String,
           default: 'Settings'
       }

   }

});
</script>

<style lang="scss">

    .settings-layout__header {
        padding: var(--spacing__large);
    }

    .settings-layout__body {
        padding-bottom: var(--spacing__large);
    }

</style>