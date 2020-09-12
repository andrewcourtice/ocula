<template>
    <div class="settings-layout">
        <div class="settings-layout__header" layout="row center-left">
            <router-link class="link--inherit" :to="backRoute" replace v-if="backRoute">
                <icon-button icon="arrow-left-line" class="margin__right--small"/>
            </router-link>
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
} from 'vue';

export default defineComponent({
   
   props: {

       title: {
           type: String,
           default: 'Settings'
       },

       backRoute: {
           type: Object
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