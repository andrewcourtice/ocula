<template>
    <drawer :id="id" class="maps-drawer" position="top" ref="drawer">
        <template #default="{ close }">
            <container class="maps-drawer__container" grid="3">
                <router-link class="link--inherit" :to="getRoute(key)" v-for="(value, key) in maps" :key="key">
                    <div class="menu-item text--centre" @click="close">
                        <icon :name="value.icon"/>
                        <div>
                            <small>{{ value.label }}</small>
                        </div>
                    </div>
                </router-link>
            </container>
        </template>
    </drawer>
</template>

<script lang="ts">
import MAP from '../../enums/maps/map';

import DRAWERS from '../../constants/core/drawers';
import MAPS from '../../constants/maps/maps';
import ROUTES from '../../constants/core/routes';

import {
    defineComponent,
    ref
} from 'vue';

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
