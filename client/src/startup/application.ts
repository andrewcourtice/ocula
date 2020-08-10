import {
    createApp
} from 'vue';

import App from '../app.vue';

export default function initialiseApplication() {
    return createApp(App);
}