<template>
    <div class="route weather-index">{{ state }}</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

import {
    state
} from '../../store/index';

export default defineComponent({
    
    setup() {
        return {
            state
        }
    }

});
</script>