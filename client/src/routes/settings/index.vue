<template>
    <settings-layout class="route settings-index">
        <div class="settings-index__body">
            <block class="settings-index__block" title="Forecast">
                <div class="menu">
                    <settings-item class="menu-item" label="Units" :value="unit.label">
                        <select name="units" v-model="units">
                            <option v-for="(value, key) in unitOptions" :key="key" :value="key">{{ value.label }}</option>
                        </select>
                    </settings-item>
                    <router-link class="link--inherit" :to="routes.locations">
                        <settings-item class="menu-item" label="Locations" :value="locationsLabel"></settings-item>
                    </router-link>
                    <router-link class="link--inherit" :to="routes.sections">
                        <settings-item class="menu-item" label="Sections"></settings-item>
                    </router-link>
                </div>
            </block>
            <block class="settings-index__block" title="Maps">
                <div class="menu">
                    <settings-item class="menu-item" label="Default Map" :value="map.label">
                        <select name="default-map" v-model="defaultMap">
                            <option v-for="(value, key) in mapOptions" :key="key" :value="key">{{ value.label }}</option>
                        </select>
                    </settings-item>
                </div>
            </block>
            <block class="settings-index__block" title="General">
                <div class="menu">
                    <router-link class="link--inherit" :to="routes.theme">
                        <settings-item class="menu-item" label="Theme" :value="theme.core.name"></settings-item>
                    </router-link>
                    <settings-item class="menu-item" label="Update" @click.native="updateApplication">
                        <template #value>
                            <loader v-if="updating"></loader>
                        </template>
                    </settings-item>
                    <settings-item class="menu-item" label="Reset" @click.native="reset"></settings-item>
                    <router-link class="link--inherit" :to="routes.about">
                        <settings-item class="menu-item" label="About"></settings-item>
                    </router-link>
                </div>
            </block>
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
    ref,
    computed
} from 'vue';

import {
    state,
    theme,
    updateSettings,
    resetSettings,
    update
} from '../../store';

import {
    core as themeOptions
} from '../../themes';

import {
    componentsController
} from '@ocula/components';

export default defineComponent({

    components: {
        SettingsLayout,
        SettingsItem
    },
    
    setup() {
        const updating = ref(false);

        const routes = {
            locations: {
                name: ROUTES.settings.locations
            },
            sections: {
                name: ROUTES.settings.sections
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
            set: units => {
                updateSettings({ units });
                update(true);
            }
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

        async function updateApplication() {
            const registration = await navigator.serviceWorker.getRegistration();

            if (!registration) {
                return;
            }

            try {
                updating.value = true;

                await registration.update();
            } finally {
                updating.value = false;
            }
        }

        async function reset() {
            try {
                await componentsController.confirm({
                    message: 'This will reset all settings back to default. This cannot be undone. Do you wish to continue?',
                    confirmLabel: 'Yes, Reset'
                });

                resetSettings();
            } catch {
                // do nothing
            }
        }

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
            updateApplication,
            updating,
            reset
        };
    }

});
</script>

<style lang="scss">

    .settings-index__header {
        padding: var(--spacing__large);
    }

    .settings-index__body {
        padding: 0 var(--spacing__small);
    }

    .settings-index__block {

        &:not(:last-of-type) {
            margin-bottom: var(--spacing__small);
        }

        & .block__title {
            color: var(--font__colour--meta);
        }

        & .block__body {
            padding: var(--spacing__small) 0;
        }
    }

</style>