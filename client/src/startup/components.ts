import Components from '@ocula/components';

import type {
    App
} from 'vue';

export default function initialiseComponents(application: App) {
    return application.use(Components);
}