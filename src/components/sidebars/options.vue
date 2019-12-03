<template>
    <sidebar class="options-sidebar" ref="sidebar">
        <div class="menu">
            <router-link to="/" class="link">
                <div class="menu-item">Outlook</div>
            </router-link>
            <router-link to="/settings" class="link">
                <div class="menu-item">Settings</div>
            </router-link>
        </div>
    </sidebar>
</template>

<script lang="ts">
import EVENTS from '../../constants/events';

import Vue from 'vue';

import subscriberMixin from '../mixins/subscriber';

export default Vue.extend({
    
    mixins: [
        subscriberMixin(EVENTS.sidebars.options)
    ],

    methods: {

        open() {
            this.$refs.sidebar.open();
        },

        close() {
            this.$refs.sidebar.close();
        }

    }

});
</script>

<style lang="scss">

    .options-sidebar {

        & .menu-item {
            padding: 1rem 2rem;
        }
    }

</style>