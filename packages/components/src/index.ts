import '@ocula/style/src/index.scss';

import directives from './directives/index';
import components from './components/index';
import transitions from './transitions/index';

import type {
    App
} from 'vue';

type Registrar = 'directive' | 'component';

function register(application: App, registrar: Registrar, dictionary: Record<string, any>): void {
    Object.keys(dictionary).forEach(key => application[registrar].call(application, key, dictionary[key]));
}

export { default as useSubscriber } from './compositions/subscriber';
export { default as useTimer } from './compositions/timer';
export { default as componentsController } from './controllers/components';

export default {

    install(application: App) {
        register(application, 'directive', directives);
        register(application, 'component', components);
        register(application, 'component', transitions);
    }

};