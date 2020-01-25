import '@ocula/style/src/index.scss';

import directives from './directives/index';
import components from './components/index';

function register(Vue, registrar, dictionary) {
    Object.keys(dictionary).forEach(key => Vue[registrar].call(Vue, key, dictionary[key]));
}

export default {

    install(Vue) {
        register(Vue, 'directive', directives);
        register(Vue, 'component', components);
    }

};