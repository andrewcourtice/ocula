<template>
    <layout class="app" footer>
        <router-view />
        <location-modal />
        <template #footer>
            <div class="app__footer" layout="row center-stretch">
                <router-link class="app__route" v-for="route in routes" :key="route.label" :to="route.route">
                    <div class="menu-item text--centre">
                        <icon :name="route.icon"/>
                        <div class="margin__top--xx-small">
                            <small>{{ route.label }}</small>
                        </div>
                    </div>
                </router-link>
            </div>
        </template>
    </layout>
</template>

<script lang="ts">
import ROUTES from './constants/routes';

import LocationModal from './components/modals/location.vue';

import {
    defineComponent
} from 'vue';

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
        return {
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
    }

    .app__footer {
        padding: var(--spacing__x-small) 0;
        border-top: 1px solid var(--border__colour);
    }

    .app__route {
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