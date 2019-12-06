import '@ocula/style/src/index.scss';

import components from './components/index';

function register(Vue, registrar, dictionary) {
    Object.keys(dictionary).forEach(key => Vue[registrar].call(Vue, key, dictionary[key]));
}

export default {

    install(Vue) {
        register(Vue, 'component', components);
    }

};