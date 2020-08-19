<template>
    <drawer :id="id" class="maps-drawer" position="top" ref="drawer">
        <container class="maps-drawer__container" grid="sm-3 lg-4">
            <router-link class="link--inherit" :to="getRoute(key)" v-for="(value, key) in maps" :key="key">
                <div class="menu-item text--centre">
                    <icon :name="value.icon"/>
                    <div>
                        <small>{{ value.label }}</small>
                    </div>
                </div>
            </router-link>
        </container>
    </drawer>
</template>

<script lang="ts">
import MAP from '../../enums/map';

import DRAWERS from '../../constants/drawers';
import MAPS from '../../constants/maps';
import ROUTES from '../../constants/routes';

import {
    defineComponent,
    ref
} from "vue";

export default defineComponent({
    
    setup() {
        const id = DRAWERS.maps;
        const drawer = ref(null);

        function getRoute(type: MAP) {
            return {
                name: ROUTES.maps.index,
                params: {
                    type
                }
            };
        }

        return {
            id,
            drawer,
            maps: MAPS,
            getRoute
        };
    }

})
</script>

<style lang="scss">

    .maps-drawer__container {
        padding: var(--spacing__small);
    }

</style>
