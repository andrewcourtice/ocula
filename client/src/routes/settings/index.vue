<template>
    <app-layout class="settings">
        <template #header>
            <div layout="row center-left">
                <icon name="settings"/><strong class="margin__left--small">Settings</strong>
            </div>
        </template>
        <section>
            <div>{{ settings.units }}</div>
            <select v-model="settings.units" name="units" id="units">
                <option v-for="(value, key) in units" :key="key" :value="key">{{ value }}</option>
            </select>
        </section>
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
    
    components: {
        AppLayout
    }

});
</script>