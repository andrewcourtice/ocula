<template>
    <div class="route weather-setup">
        <p>No location set</p>
        <button class="button" @click="editLocations">Open Locations</button>
    </div>
</template>

<script lang="ts">
import appController from '../../controllers/application';

import {
    defineComponent
} from 'vue';

import {
    state
} from '../../store';

export default defineComponent({
    setup() {
        return {
            editLocations: appController.editLocations
        }
    }
});
</script>