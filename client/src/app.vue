<template>
    <div class="app">
        <router-view #default="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
        <navigation-sidebar />
    </div>
</template>

<script lang="ts">
import NavigationSidebar from './components/core/sidebars/navigation.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        NavigationSidebar
    }

});
</script>

<style lang="scss">

    .app {
        width: 100%;
        margin: 0;
        padding: 0;
        user-select: none;
    }

</style>