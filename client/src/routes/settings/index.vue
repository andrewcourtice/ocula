<template>
    <app-layout class="settings">
        <template #header>
            <div layout="row center-left">
                <icon name="settings"/><span class="margin__left--small">Settings</span>
            </div>
        </template>
        <section>

        </section>
    </app-layout>
</template>

<script lang="ts">
import Vue from 'vue';

import AppLayout from '../../components/core/layouts/app.vue';

export default Vue.extend({
    
    components: {
        AppLayout
    }

});
</script>