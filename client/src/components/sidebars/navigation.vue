<template>
    <sidebar :id="id" class="navigation-sidebar">
        <div class="navigation-sidebar__branding">
            <img class="navigation-sidebar__branding-logo" :src="logo" alt="Ocula">
            <h1 class="navigation-sidebar__branding-title">Ocula</h1>
        </div>
        <div class="menu">
            <router-link to="/" class="link">
                <div class="menu-item" layout="row center-left">
                    <icon name="cloud-drizzle" class="margin__right--small"></icon>
                    <strong>Weather</strong>
                </div>            
            </router-link>
            <router-link to="/settings" class="link">
                <div class="menu-item" layout="row center-left">
                    <icon name="settings" class="margin__right--small"></icon>
                    <strong>Settings</strong>
                </div>
            </router-link>
            <router-link to="/about" class="link">
                <div class="menu-item" layout="row center-left">
                    <icon name="info" class="margin__right--small"></icon>
                    <strong>About</strong>
                </div>
            </router-link>
            <!-- <div class="menu-item" layout="row center-left" v-if="updateReady" @click="update">
                <icon name="refresh-cw" class="margin__right--small"></icon>
                <div>
                    <strong>Update available</strong>
                    <br>
                    <small class="text--meta">Tap here to update</small>
                </div>
            </div> -->
        </div>
    </sidebar>
</template>

<script lang="ts">
import SIDEBARS from '../../constants/sidebars';

import logo from '../../assets/images/logo/logo-192.svg';

import {
    defineComponent
} from 'vue';

export default defineComponent({

    setup() {
        const id = SIDEBARS.navigation;

        return {
            id,
            logo
        };
    }

});
</script>

<style lang="scss">

    .navigation-sidebar {

        & .menu-item {
            padding: var(--spacing__small) var(--spacing__large);
        }
    }

    .navigation-sidebar__branding {
        padding: var(--spacing__large) var(--spacing__small);
        text-align: center;
    }

    .navigation-sidebar__branding-logo {
        width: 96px;
    }

    .navigation-sidebar__branding-title {
        margin-top: var(--spacing__small);
        font-size: var(--font__size--large);
        font-weight: var(--font__weight--medium);
        text-transform: uppercase;
        letter-spacing: 4px;
    }

</style>