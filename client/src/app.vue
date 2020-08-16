<template>
    <layout class="app transition-theme-change" :class="theme.core.class" footer>
        <router-view />
        <template #footer>
            <div class="app__footer">
                <container layout="row center-stretch">
                    <router-link class="app__route" v-for="route in routes" :key="route.label" :to="route.route">
                        <div class="menu-item text--centre">
                            <icon :name="route.icon"/>
                            <div class="margin__top--xx-small">
                                <small>{{ route.label }}</small>
                            </div>
                        </div>
                    </router-link>
                </container>
            </div>
        </template>
        <location-modal />

        <core-components />
    </layout>
</template>

<script lang="ts">
import ROUTES from './constants/routes';

import LocationModal from './components/modals/location.vue';

import setThemeMeta from './helpers/set-theme-meta';

import {
    defineComponent,
    watch
} from 'vue';

import {
    theme
} from './store';

const routes = [
    {
        label: 'Forecast',
        icon: 'sun',
        route: {
            name: ROUTES.forecast.index
        }
    },
    {
        label: 'Radar',
        icon: 'target',
        route: {
            name: ROUTES.radar.index
        }
    },
    {
        label: 'Settings',
        icon: 'sliders',
        route: {
            name: ROUTES.settings.index
        }
    }
];

export default defineComponent({

    components: {
        LocationModal
    },

    setup() {
        watch(() => theme.value.core, ({ colour }) => setThemeMeta(colour));
        
        return {
            theme,
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

    .app__footer {
        border-top: 1px solid var(--border__colour);
    }

    .app__route {
        display: block;
        padding: var(--spacing__x-small);
        color: var(--font__colour);

        &.router-link-active {
            color: var(--colour__primary);
        }
    }

    .route {
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }

</style>