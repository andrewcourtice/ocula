<template>
    <sidebar ref="sidebar">
        <div>Some content</div>
    </sidebar>
</template>

<script lang="ts">
import EVENTS from '../../constants/events';

import Vue from 'vue';

import subscriberMixin from '../mixins/subscriber';

export default Vue.extend({
    
    mixins: [
        subscriberMixin(EVENTS.sidebars.settings, vm => vm.open)
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