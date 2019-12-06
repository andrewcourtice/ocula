<template>
    <sidebar class="alerts-sidebar" position="right" ref="sidebar">
        <div class="menu">
            <div v-for="num in 3" :key="num" class="menu-item">
                <div layout="row center-left" style="margin-bottom: 0.5rem">
                    <i class="fas fa-bolt" style="margin-right: 1rem;"></i>
                    <strong>Severe Weather Alert</strong>
                </div>
                <span>A severe weather alert has been issued for the QLD area. Severe thunderstorms are forecast for the Widebay and Burnett areas</span>
            </div>
        </div>
    </sidebar>
</template>

<script lang="ts">
import EVENTS from '../../../constants/events';

import Vue from 'vue';

import subscriberMixin from '../../../components/core/mixins/subscriber';

export default Vue.extend({
    
    mixins: [
        subscriberMixin(EVENTS.sidebars.alerts)
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

    .alerts-sidebar {

        & .menu-item {
            padding: 1rem 2rem;
        }
    }

</style>