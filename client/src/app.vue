<template>
    <layout class="app transition-theme-change" :class="appClass" footer>
        <router-view />
        <template #footer>
            <nav class="app__nav">
                <container class="app__nav-container" layout="row center-stretch" :grid="routes.length">
                    <router-link class="app__route" v-for="route in routes" :key="route.label" :to="route.route">
                        <icon-button class="app__route-button" layout="vertical" :icon="route.icon">
                            <small>{{ route.label }}</small>
                        </icon-button>
                    </router-link>
                </container>
            </nav>
        </template>
        <location-modal />
        <core-components />
    </layout>
</template>

<script lang="ts">
import ROUTES from './constants/core/routes';

import LocationModal from './components/modals/location.vue';

import setThemeMeta from './helpers/set-theme-meta';

import {
    defineComponent,
    watch,
    computed
} from 'vue';

import {
    phase,
    theme
} from './store';
import PHASE from './enums/forecast/phase';

const routes = [
    {
        label: 'Forecast',
        icon: 'sun-line',
        route: {
            name: ROUTES.forecast.index
        }
    },
    {
        label: 'Maps',
        icon: 'road-map-line',
        route: {
            name: ROUTES.maps.index
        }
    },
    {
        label: 'Settings',
        icon: 'equalizer-line',
        route: {
            name: ROUTES.settings.index
        }
    }
];

const PHASE_CLASS = {
    [PHASE.day]: 'phase--day',
    [PHASE.night]: 'phase--night'
};

export default defineComponent({

    components: {
        LocationModal
    },

    setup() {
        watch(() => theme.value.core, ({ colour }) => setThemeMeta(colour));

        const appClass = computed(() => [
            PHASE_CLASS[phase.value],
            theme.value.core.class
        ]);
        
        return {
            appClass,
            routes
        };
    }

});
</script>

<style lang="scss">

    .app {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        user-select: none;
        color: var(--font__colour);
        background-color: var(--background__colour);
    }

    .app__nav {
        border-top: 1px solid var(--border__colour);
    }

    .app__nav-container {
        padding: var(--spacing__x-small) var(--spacing__medium);
    }

    .app__route {
        display: block;
        color: inherit;

        &:hover {
            color: inherit;
        }

        &.router-link-active {
            color: var(--colour__primary);
        }
    }

    .app__route-button {
        display: flex;
    }

    .route {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }

    .transition-theme-change {
        transition: color var(--transition__timing--fade) var(--transition__easing--default),
                    background var(--transition__timing--fade) var(--transition__easing--default);
    }

</style>