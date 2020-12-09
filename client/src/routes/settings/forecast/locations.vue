<template>
    <settings-layout class="route settings-locations" title="Locations" :back-route="backRoute">
        <div class="settings-locations__locations menu">
            <div class="menu-item" layout="row center-justify" v-for="location in locations" :key="location.id">
                <div class="text--truncate" self="size-x1">{{ location.longName }}</div>
                <div v-tooltip:left="'Remove Location'" @click.stop="removeLocation(location)">
                    <icon name="delete-bin-line" class="margin__left--small"/>
                </div>
            </div>
        </div>
    </settings-layout>
</template>

<script lang="ts">
import ROUTES from '../../../constants/core/routes';

import SettingsLayout from '../../../components/layouts/settings.vue';

import {
    defineComponent,
    computed
} from 'vue';

import {
    state,
    removeLocation
} from '../../../store';

export default defineComponent({
    
    components: {
        SettingsLayout
    },

    setup() {
        const backRoute = {
            name: ROUTES.settings.index
        };

        const locations = computed(() => state.settings.locations);

        return {
            backRoute,
            locations,
            removeLocation
        };
    }

});
</script>

<style lang="scss">

    .settings-locations__locations {
        padding: 0 var(--spacing__small);
    }

</style>