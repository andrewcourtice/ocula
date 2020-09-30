import {
    plugin
} from '@ocula/state';

import type {
    App
} from 'vue';

export default function initialiseComponents(application: App) {
    return application.use(plugin);
}