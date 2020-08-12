<template>
    <app-layout class="route about-master">
        <template #header>
            <strong class="margin__left--small">About</strong>
        </template>
        <router-view />
    </app-layout>
</template>

<script lang="ts">
import AppLayout from '../components/core/layouts/app.vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    components: {
        AppLayout
    }

});
</script>