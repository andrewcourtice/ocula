<template>
    <div class="weather-uv-index"></div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed
} from "vue";

const RATINGS = [
    {
        label: 'Low',
        range: [0, 2]
    },
    {
        label: 'Moderate',
        range: [3, 5]
    },
    {
        label: 'High',
        range: [6, 7]
    },
    {
        label: 'Very High',
        range: [8, 10]
    },
    {
        label: 'Extreme',
        range: [11, Infinity]
    }
] as const;

export default defineComponent({
    
    props: {

        uvIndex: {
            type: Number
        }

    },

    setup(props) {
        const rating = computed(() => {
            return RATINGS.find(({ range }) => props.uvIndex >= range[0] && props.uvIndex <= range[1])
        });

        const offset = computed(() => Math.min((props.uvIndex / 12) * 100, 100));

        return 
    }

});
</script>

<style lang="scss">

    .weather-uv-index {
        display: block;
        width: 100%;
        height: 0.5rem;
        border-radius: 0.25rem;
        background: linear-gradient(
            to right,
            #3FA72D,
            #FFF301 16.66%,
            #F18B00 41.66%,
            #E53110 58.33%,
            #B467A4 83.33%
        );
    }

</style>