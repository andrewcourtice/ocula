<template>
    <div class="transition-box-resize" ref="element" @transitionend.self.passive="onTransitionEnd">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onBeforeUpdate,
    onUpdated
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

export default defineComponent({
   
    setup() {
        const element = ref<HTMLElement>(null);

        let before: IBox,
            after: IBox;

        function setStyle(property: string, value: any): void {
            element.value.style[property] = value;
        }

        function reset(): void {           
            setStyle('width', null);
            setStyle('height', null);
        }

        function onTransitionEnd(): void {
            element.value.classList.remove(
                CLASSES.enter,
                CLASSES.leave,
                CLASSES.enterActive,
                CLASSES.leaveActive,
            );

            reset();
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
            
            setStyle('width', `${before.width}px`);
            setStyle('height', `${before.height}px`);

            element.value.classList.add(CLASSES.enterActive, CLASSES.leaveActive);

            requestAnimationFrame(() => {                
                setStyle('width', `${after.width}px`);
                setStyle('height', `${after.height}px`);
            });
        }

        onBeforeUpdate(() => {
            before = getSnapshot();
            requestAnimationFrame(update);
        });

        return {
            element,
            onTransitionEnd
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