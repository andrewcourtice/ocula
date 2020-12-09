<template>
    <div ref="element"
        class="transition-box-resize"
        @transitionend.self.passive="reset">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onBeforeUpdate,
    computed
} from 'vue';

interface IBox {
    width: number;
    height: number;
}

const CLASSES = {
    enter: 'transition-box-resize-enter',
    leave: 'transition-box-resize-leave',
    enterActive: 'transition-box-resize-enter-active',
    leaveActive: 'transition-box-resize-leave-active'
};

function isSameBox(a: IBox, b: IBox): boolean {
    return a.width === b.width && a.height === b.height;
}

export default defineComponent({
   
    setup(props) {
        let isUpdating = false;

        const element = ref<HTMLElement>(null);

        let before: IBox,
            after: IBox;

        function setStyle(property: keyof CSSStyleDeclaration, value: any): void {
            element.value.style[property as string] = value;
        }

        function reset(): void {
            element.value.classList.remove(
                CLASSES.enter,
                CLASSES.leave,
                CLASSES.enterActive,
                CLASSES.leaveActive,
            );

            setStyle('width', null);
            setStyle('height', null);
            
            isUpdating = false;
        }

        function getSnapshot(): IBox {
            return {
                width: element.value.scrollWidth,
                height: element.value.scrollHeight
            };
        }

        function update(): void {
            reset();

            element.value.classList.add(CLASSES.enter, CLASSES.leave);
            
            after = getSnapshot();

            if (isSameBox(before, after)) {
                return reset();
            }
            
            setStyle('width', `${before.width}px`);
            setStyle('height', `${before.height}px`);

            element.value.classList.add(CLASSES.enterActive, CLASSES.leaveActive);

            requestAnimationFrame(() => {                
                setStyle('width', `${after.width}px`);
                setStyle('height', `${after.height}px`);
            });
        }

        function beforeUpdate(): void {
            if (isUpdating) {
                return;
            }

            isUpdating = true;

            before = getSnapshot();
            requestAnimationFrame(update);
        }

        onBeforeUpdate(beforeUpdate);

        return {
            element,
            reset,
            onBeforeUpdate: beforeUpdate
        };
    }

});
</script>

<style lang="scss">

    .transition-box-resize-enter,
    .transition-box-resize-leave {
        overflow: hidden !important;
    }

    .transition-box-resize-enter-active,
    .transition-box-resize-leave-active {
        transition: width var(--transition__timing--long) var(--transition__easing--default),
                    height var(--transition__timing--long) var(--transition__easing--default);
    }

</style>