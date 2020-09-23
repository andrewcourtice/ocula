import type {
    Directive,
    DirectiveBinding
} from '@vue/runtime-core';

const VISIBILITY_MAP = {
    0: 'hidden',
    1: 'visible'
};

function updateVisibility(element: HTMLElement, binding: DirectiveBinding<boolean>) {
    element.style.visibility = VISIBILITY_MAP[+!!binding.value];
}

export default {
    
    mounted: updateVisibility,
    updated: updateVisibility,

    unmounted(element) {
        element.style.visibility = null;
    }

} as Directive<HTMLElement, boolean>;