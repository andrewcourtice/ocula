<template>
    <div name="layout" class="layout">
        <header class="layout__header" v-if="$slots.header && header">
            <slot name="header"></slot>
        </header>
        <aside class="layout__sidebar layout__sidebar--left" v-if="$slots.sidebarLeft && sidebarLeft">
            <slot name="sidebarLeft"></slot>
        </aside>
        <div class="layout__body">
            <slot></slot>
        </div>
        <aside class="layout__sidebar layout__sidebar--right" v-if="$slots.sidebarRight && sidebarRight">
            <slot name="sidebarRight"></slot>
        </aside>
        <footer class="layout__footer" v-if="$slots.footer && footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';

export default defineComponent({
    
    props: {

        header: {
            type: Boolean,
            default: false
        },

        sidebarLeft: {
            type: Boolean,
            default: false
        },

        sidebarRight: {
            type: Boolean,
            default: false
        },

        footer: {
            type: Boolean,
            default: false
        }

    }

});
</script>

<style lang="scss">

    .layout {
        display: grid;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        grid-template-areas: 
            "header header header"
            "sidebar-left body sidebar-right"
            "footer footer footer";
    }

    .layout__header {
        grid-area: header;
    }

    .layout__body {
        grid-area: body;
        overflow: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    .layout__footer {
        grid-area: footer;
    }

    .layout__sidebar--left {
        grid-area: sidebar-left;
    }

    .layout__sidebar--right {
        grid-area: sidebar-right;
    }

</style>