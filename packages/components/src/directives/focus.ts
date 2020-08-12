import {
    Directive
} from 'vue';

export default {

    mounted(el, binding) {
        const {
            value,
            modifiers
        } = binding;

        const query = value || 'input, select, textarea';
        const element = el.querySelector<HTMLInputElement>(query) || el;

        if (!element) {
            return;
        }

        element.focus();

        if (modifiers.highlight) {
            element.setSelectionRange(0, element.value.length);
        }
    }

} as Directive<HTMLInputElement, string>;