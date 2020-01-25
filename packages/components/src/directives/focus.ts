export default {

    inserted(el: Element, binding) {
        const {
            value,
            modifiers
        } = binding;

        const query = value || 'input, select, textarea';
        const element = el.querySelector(query) || el;

        if (!element) {
            return;
        }

        element.focus();

        if (modifiers.highlight) {
            element.setSelectionRange(0, element.value.length);
        }
    }

};