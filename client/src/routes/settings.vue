<template>
    <app-layout class="route settings-master">
        <template #header>
            <strong class="margin__left--small">Settings</strong>
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