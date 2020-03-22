<template>
    <app-layout class="settings-route">
        <template #header>
            <div layout="row center-left">
                <icon name="settings"/><strong class="margin__left--small">Settings</strong>
            </div>
        </template>
        <block title="Units" class="margin__top--large">
            <select v-model="settings.units" name="units" id="units">
                <option v-for="(value, key) in units" :key="key" :value="key">{{ value }}</option>
            </select>
        </block>
        <block title="Locations">
            <div class="menu">
                <div class="menu-item" v-for="location in settings.locations" :key="location.id" layout="row center-justify">
                    <div>{{ location.shortName }}</div>
                    <div @click.stop="removeLocation(location)">
                        <icon name="trash-2" class="margin__left--small"/>
                    </div>
                </div>
            </div>
        </block>
    </app-layout>
</template>

<script lang="ts">
import UNITS from '../../constants/units';

import Vue from 'vue';

import AppLayout from '../../components/core/layouts/app.vue';

import settingsController from '../../controllers/settings';

import {
    objectCloneLazy
} from '@ocula/utilities';

const UNIT_MAP = {
    [UNITS.auto]: 'Auto',
    [UNITS.si]: 'Metric',
    [UNITS.us]: 'Imperial'
};

export default Vue.extend({

    data() {
        return {
            units: UNIT_MAP,
            settings: objectCloneLazy(settingsController.data)
        };
    },

    methods: {

        removeLocation(location) {
            settingsController.removeLocation(location);
        }

    },

    watch: {

        settings: {
            deep: true,
            handler(value) {
                settingsController.updateSettings(value);
            }
        }

    },
    
    components: {
        AppLayout
    }

});
</script>