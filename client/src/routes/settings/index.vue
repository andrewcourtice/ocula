<template>
    <div class="route settings-index">
        <div>
            <strong>Settings</strong>
        </div>
        <section class="margin__top--large">
            <div class="menu">
                <div class="menu-item" layout="row center-justify">
                    <div>Units</div>
                    <div class="text--meta">{{ theme.name }}</div>
                    <select name="units" v-model="units">
                        <option v-for="options in unitOptions" :key="options.value" :value="options.value">{{ options.label }}</option>
                    </select>
                </div>
                <div class="menu-item" layout="row center-justify">
                    <div>Locations</div>
                    <div class="text--meta">{{ theme.name }}</div>
                </div>
                <router-link :to="themeRoute">
                    <div class="menu-item" layout="row center-justify">
                        <div>Theme</div>
                        <div class="text--meta">{{ theme.name }}</div>
                    </div>
                </router-link>
            </div>
        </section>
    </div>
</template>

<script>
import ROUTES from '../../constants/routes';
import UNITS from '../../constants/units';

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
    
    setup() {
        const themeRoute = {
            name: ROUTES.settings.themes
        };

        const units = computed({
            get: () => state.settings.units,
            set: value => updateSettings({
                units: value
            })
        });

        return {
            units,
            unitOptions,
            theme,
            themeOptions,
            themeRoute
        };
    }

});
</script>

<style lang="scss">

</style>