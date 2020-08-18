<template>
    <settings-layout class="route settings-index">
        <div class="settings-index__settings menu">
            <settings-item class="menu-item" label="Units" :value="units.label">
                <select name="units" v-model="units">
                    <option v-for="option in unitOptions" :key="option.value" :value="option">{{ option.label }}</option>
                </select>
            </settings-item>
            <router-link class="link--inherit" :to="routes.locations">
                <settings-item class="menu-item" label="Locations" :value="locationsLabel"></settings-item>
            </router-link>
            <router-link class="link--inherit" :to="routes.theme">
                <settings-item class="menu-item" label="Theme" :value="theme.core.name"></settings-item>
            </router-link>
            <router-link class="link--inherit" :to="routes.about">
                <settings-item class="menu-item" label="About"></settings-item>
            </router-link>
        </div>
    </settings-layout>
</template>

<script>
import ROUTES from '../../constants/routes';
import UNITS from '../../constants/units';

import SettingsLayout from '../../components/layouts/settings.vue';
import SettingsItem from '../../components/settings/settings-item.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    theme,
    updateSettings
} from '../../store';

import {
    core as themeOptions
} from '@ocula/themes';

const unitOptions = [
    {
        label: 'Metric',
        value: UNITS.metric
    },
    {
        label: 'Imperial',
        value: UNITS.imperial
    }
];

export default defineComponent({

    components: {
        SettingsLayout,
        SettingsItem
    },
    
    setup() {
        const routes = {
            locations: {
                name: ROUTES.settings.locations
            },
            theme: {
                name: ROUTES.settings.themes
            },
            about: {
                name: ROUTES.settings.about
            }
        };

        const units = computed({
            get: () => unitOptions.find(unit => unit.value === state.settings.units),
            set: ({ value }) => updateSettings({
                units: value
            })
        });
        
        const locationsLabel = computed(() => `${state.settings.locations.length} saved`);

        return {
            routes,
            units,
            unitOptions,
            locationsLabel,
            theme,
            themeOptions
        };
    }

});
</script>

<style lang="scss">

    .settings-index__header {
        padding: var(--spacing__large);
    }

    .settings-index__settings {
        padding: 0 var(--spacing__small);
    }

</style>