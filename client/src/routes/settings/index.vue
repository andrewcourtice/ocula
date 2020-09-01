<template>
    <settings-layout class="route settings-index">
        <div class="settings-index__settings menu">
            <settings-item class="menu-item" label="Units" :value="unit.label">
                <select name="units" v-model="units">
                    <option v-for="(value, key) in unitOptions" :key="key" :value="key">{{ value.label }}</option>
                </select>
            </settings-item>
            <router-link class="link--inherit" :to="routes.locations">
                <settings-item class="menu-item" label="Locations" :value="locationsLabel"></settings-item>
            </router-link>
            <settings-item class="menu-item" label="Default Map" :value="map.label">
                <select name="default-map" v-model="defaultMap">
                    <option v-for="(value, key) in mapOptions" :key="key" :value="key">{{ value.label }}</option>
                </select>
            </settings-item>
            <router-link class="link--inherit" :to="routes.theme">
                <settings-item class="menu-item" label="Theme" :value="theme.core.name"></settings-item>
            </router-link>
            <router-link class="link--inherit" :to="routes.about">
                <settings-item class="menu-item" label="About"></settings-item>
            </router-link>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import UNITS from '../../constants/forecast/units';

import ROUTES from '../../constants/core/routes';
import MAPS from '../../constants/maps/maps';

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
} from '../../themes';

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
            get: () => state.settings.units,
            set: value => updateSettings({
                units: value
            })
        });

        const defaultMap = computed({
            get: () => state.settings.maps.default,
            set: value => updateSettings({
                maps: {
                    ...state.settings.maps, 
                    default: value
                }
            })
        });
        
        const unit = computed(() => UNITS[state.settings.units]);
        const map = computed(() => MAPS[state.settings.maps.default]);

        const locationsLabel = computed(() => `${state.settings.locations.length} saved`);

        return {
            routes,
            units,
            unit,
            defaultMap,
            map,
            locationsLabel,
            theme,
            themeOptions,
            mapOptions: MAPS,
            unitOptions: UNITS,
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