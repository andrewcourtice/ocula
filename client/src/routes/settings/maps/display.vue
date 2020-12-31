<template>
    <settings-layout class="route settings-maps-display" title="Display" :back-route="backRoute">
        <div class="settings-maps-display__options">
            <block title="Zoom">
                <template #secondary>{{ zoom }}</template>
                <input class="settings-maps-display__slider" type="range" min="1" max="12" step="1" v-model.number="zoom">
            </block>
            <block class="margin__top--large" title="Pitch">
                <template #secondary>{{ pitch }} &deg;</template>
                <input class="settings-maps-display__slider" type="range" min="0" max="85" step="5" v-model.number="pitch">
            </block>
            <block class="margin__top--large" title="Preview">
                <mapbox-map class="settings-maps-display__map"
                    :latitude="location.latitude"
                    :longitude="location.longitude"
                    :style="theme.core.mapStyle"
                    :zoom="zoom"
                    :pitch="pitch"
                    :interactive="false">
                </mapbox-map>
            </block>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import ROUTES from '../../../constants/core/routes';

import SettingsLayout from '../../../components/layouts/settings.vue';

import {
    defineComponent,
    ref,
    computed
} from 'vue';

import {
    state,
    theme,
    updateSettings
} from '../../../store';

import {
    functionDebounce
} from '@ocula/utilities';

import type {
    IMapSettings
} from '../../../types/storage';

export default defineComponent({
    
    components: {
        SettingsLayout
    },

    setup() {
        const backRoute = {
            name: ROUTES.settings.index
        };

        // Sydney, Australia
        const location = {
            latitude: -33.8688,
            longitude: 151.2093
        }

        function getMapsComputed(key: keyof IMapSettings) {
            return {
                get: () => state.settings.maps[key],
                set: functionDebounce(value => {
                    updateSettings({
                        maps: {
                            ...state.settings.maps,
                            [key]: value
                        }
                    })
                }, 100)
            }
        }

        const zoom = computed(getMapsComputed('zoom'));
        const pitch = computed(getMapsComputed('pitch'));

        return {
            backRoute,
            location,
            theme,
            zoom,
            pitch
        };
    }

});
</script>

<style lang="scss">

    .settings-maps-display__options {
        padding: 0 var(--spacing__large);
    }

    .settings-maps-display__slider {
        display: block;
        width: 100%;
    }

    .settings-maps-display__map {
        width: 100%;
        height: 33vh;
        border: 1px solid var(--border__colour);
        border-radius: var(--border__radius);
        overflow: hidden;
    }

</style>