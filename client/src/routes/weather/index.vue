<template>
    <div class="route weather-index">{{ state }}</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onActivated,
    onBeforeMount
} from 'vue';

import {
    state,
    update
} from '../../store/index';

export default defineComponent({
    
    setup() {
        onBeforeMount(update);
        onActivated(update);

        return {
            state
        }
    }

});
</script>