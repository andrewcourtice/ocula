<template>
    <settings-layout class="route settings-themes" title="Themes">
        <div class="settings-themes__themes">
            <div class="settings-themes__theme"
                layout="row center-center"
                v-for="(value, key) in themes"
                :key="key"
                :class="value.class"
                @click="setTheme(value.id)">
                <div>{{ value.name }}</div>
            </div>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import SettingsLayout from '../../components/layouts/settings.vue';

import {
    defineComponent,
    computed
} from "vue";

import {
    state,
    updateSettings
} from '../../store';

import {
    core as themes
} from '@ocula/themes';

export default defineComponent({

    components: {
        SettingsLayout
    },
    
    setup() {
        const theme = computed(() => state.settings.theme);

        function setTheme(id: string): void {
            updateSettings({
                theme: id
            });
        }

        return {
            theme,
            themes,
            setTheme
        };
    }

});
</script>

<style lang="scss">

    .settings-themes__themes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing__small);
        padding: 0 var(--spacing__large);
    }

    .settings-themes__theme {
        color: var(--font__colour);
        background-color: var(--background__colour);
        border: 1px solid var(--border__colour);
        border-radius: var(--border__radius);
        overflow: hidden;

        &::after {
            display: block;
            content: '';
            padding-bottom: 100%;
        }
    }

</style>