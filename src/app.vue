<template>
    <div class="app">
        <h1>Ocula</h1>
        <input type="text" v-model="query">
        <button @click="forwardGeocode">Forward Geocode</button>
        <button @click="reverseGeocode">Reverse Geocode</button>
        <button @click="forecast">Forecast</button>
        <pre>
            <code>{{ output }}</code>
        </pre>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

    data() {
        return {
            query: '',
            output: null
        };
    },
    
    methods: {

        async forwardGeocode() {
            const response = await fetch(`/api/forward-geocode?term=${this.query}`);

            this.output = await response.json();
        },

        async reverseGeocode() {
            if (!navigator.geolocation) {
                return;
            }

            const position: Position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const {
                latitude,
                longitude
            } = position.coords;

            const response = await fetch(`/api/reverse-geocode?latitude=${latitude}&longitude=${longitude}`);

            this.output = await response.json();
        },

        async forecast() {
            const response = await fetch(`/api/forecast`);

            this.output = await response.json();
        }

    }

});
</script>