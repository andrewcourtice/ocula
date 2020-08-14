<template>
    <div class="route settings-master">
        <container class="settings-master__container">
            <router-view />
        </container>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({

});
</script>

<style lang="scss">
 
    .settings-master__container {
        padding: var(--spacing__large);
    }

</style>