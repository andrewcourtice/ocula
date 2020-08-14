<template>
    <div class="route radar-index">
        <container>
            <weather-actions></weather-actions>
            <div>
                {{ state.settings }}
            </div>
        </container>
    </div>
</template>

<script lang="ts">
import WeatherActions from '../../components/weather/actions.vue';

import {
    defineComponent
} from 'vue';

import {
    state
} from '../../store/index';

export default defineComponent({

    components: {
        WeatherActions
    },
    
    setup() {
        return {
            state
        }
    }

});
</script>