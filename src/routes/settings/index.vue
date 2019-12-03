<template>
    <app-layout>
        <template #header>
            <strong style="margin-left: 1rem;">Settings</strong>
        </template>
        <card>
            <template #header>
                <strong>General</strong>
            </template>
            <div class="menu">
                <div class="menu-item">Units</div>
                <div class="menu-item">Locations</div>
                <div class="menu-item">Alerts</div>
            </div>
        </card>
        <card style="margin-top: 1rem;">
            <template #header>
                <strong>Theme</strong>
            </template>
            <div class="menu">
                <div class="menu-item">Units</div>
                <div class="menu-item">Locations</div>
                <div class="menu-item">Alerts</div>
            </div>
        </card>
    </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';

import AppLayout from '../../components/layouts/app.vue';

export default Vue.extend({
    
    components: {
        AppLayout
    }

});
</script>