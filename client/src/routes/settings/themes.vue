<template>
    <settings-layout class="route settings-themes" title="Themes" :back-route="backRoute">
        <div class="settings-themes__themes">
            <div class="settings-themes__theme"
                layout="row center-center"
                v-for="(value, key) in themes"
                :key="key"
                :class="value.class"
                @click="setTheme(value.id)">
                <div>{{ value.name }}</div>
                <div class="settings-themes__theme-check" v-show="isCurrentTheme(value.id)">
                    <small class="text--x-small">
                        <icon name="check"/>
                    </small>
                </div>
            </div>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import ROUTES from '../../constants/routes';

import SettingsLayout from '../../components/layouts/settings.vue';

import {
    defineComponent,
    computed
} from "vue";

import {
    state,
    theme,
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
        const backRoute = {
            name: ROUTES.settings.index
        };

        const theme = computed(() => state.settings.theme);

        function isCurrentTheme(id: string) {
            return id === theme.value;
        }

        function setTheme(id: string): void {
            updateSettings({
                theme: id
            });
        }

        return {
            backRoute,
            theme,
            themes,
            isCurrentTheme,
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
        position: relative;
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

    .settings-themes__theme-check {
        position: absolute;
        top: var(--spacing__x-small);
        right: var(--spacing__x-small);
        padding: var(--spacing__xx-small);
        color: var(--font__colour--compliment);
        background-color: var(--colour__primary);
        border-radius: 50%;

        & .icon {
            display: block;
        }
    }

</style>