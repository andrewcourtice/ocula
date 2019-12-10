<template>
    <div class="weather-today">
        
    </div>
</template>

<script lang="ts">
import EVENTS from '../../constants/events';

import Vue from 'vue';

import weatherController from '../../controllers/weather';
import settingsController from '../../controllers/settings';

import refreshable from './_base/refreshable';

export default Vue.extend({

    extends: refreshable()

});
</script>

<style lang="scss">

    .weather-outlook {

        & .card:not(:last-child) {
            margin-bottom: var(--spacing__small);
        }
    }

</style>