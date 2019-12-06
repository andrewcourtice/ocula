<template>
    <sidebar class="options-sidebar" ref="sidebar">
        <div class="menu">
            <router-link to="/" class="link">
                <div class="menu-item" layout="row center-left">
                    <icon name="cloud-sun-rain" class="margin__right--small"></icon>
                    <strong>Weather</strong>
                </div>            
            </router-link>
            <router-link to="/settings" class="link">
                <div class="menu-item" layout="row center-left">
                    <icon name="cog" class="margin__right--small"></icon>
                    <strong>Settings</strong>
                </div>
            </router-link>
            <div class="menu-item" layout="row center-left" v-if="updateReady" @click="update">
                <icon name="sync" class="margin__right--small"></icon>
                <div>
                    <strong>Update available</strong>
                    <br>
                    <small>Tap here to update</small>
                </div>
            </div>
        </div>
    </sidebar>
</template>

<script lang="ts">
import EVENTS from '../../constants/events';

import Vue from 'vue';

import applicationController from '../../controllers/application';

import subscriberMixin from '../mixins/subscriber';

export default Vue.extend({
    
    mixins: [
        subscriberMixin(EVENTS.sidebars.options)
    ],

    computed: {

        updateReady() {
            return applicationController.updateReady;
        }

    },

    methods: {

        open() {
            this.$refs.sidebar.open();
        },

        close() {
            this.$refs.sidebar.close();
        },

        update() {
            window.location.reload();
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