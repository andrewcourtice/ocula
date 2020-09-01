import {
    Directive
} from 'vue';

import {
    domSetMeta
} from '@ocula/utilities';

export default {

    mounted(element, { arg, value }) {
        domSetMeta(arg, value);
    },

    updated(element, { arg, value }) {
        domSetMeta(arg, value);
    },

    unmounted(element, { arg }) {
        domSetMeta(arg);
    }

} as Directive<HTMLInputElement, string>