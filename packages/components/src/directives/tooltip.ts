import {
    Directive
} from 'vue';

function upsert(element: HTMLElement, binding) {
    const {
        value,
        arg = 'top'
    } = binding;
    
    element.setAttribute('data-tooltip', value);
    element.setAttribute('data-tooltip-position', arg);
}

export default {

    mounted: upsert,
    updated: upsert,

    unmounted(element) {
        element.removeAttribute('data-tooltip');
        element.removeAttribute('data-tooltip-position');
    }

} as Directive<HTMLInputElement, string>;