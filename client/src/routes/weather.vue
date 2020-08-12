<template>
    <app-layout class="route weather-master">
        <router-view v-if="hasLocationSet"/>
        <weather-empty-state v-else/>
    </app-layout>    
</template>

<script lang="ts">
import AppLayout from '../components/core/layouts/app.vue';
import WeatherEmptyState from '../components/weather/empty-state.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
} from '../store';

import {
    typeIsNil
} from '@ocula/utilities';

export default defineComponent({

    components: {
        AppLayout,
        WeatherEmptyState
    },

    setup() {
        const hasLocationSet = computed(() => !typeIsNil(state.settings.location));

        return {
            hasLocationSet
        };
    }

});
</script>