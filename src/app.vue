<template>
    <div class="app">
        <h1>Ocula</h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    
    async mounted() {
        const result = await fetch('https://api.darksky.net/forecast/69cd194bf98a01df899a6f562d4018bd/37.8267,-122.4233', {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'no-cors'
        });
        const data = result.text();

        console.log(data);
    }

});
</script>