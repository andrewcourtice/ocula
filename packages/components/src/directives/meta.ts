import {
    Directive
} from 'vue';

function updateMeta(key: string, value?: string) {
    let meta = document.querySelector(`meta[name=${key}]`);
    
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', key);
        document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', value);
}

export default {

    mounted(element, { arg, value }) {
        updateMeta(arg, value);
    },

    updated(element, { arg, value }) {
        updateMeta(arg, value);
    },

    unmounted(element, { arg }) {
        updateMeta(arg, '');
    }

} as Directive<HTMLInputElement, string>