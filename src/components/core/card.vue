<template>
    <div class="card">
        <div class="card__header" v-if="$scopedSlots.header">
            <slot name="header"></slot>
        </div>
        <div class="card__body">
            <slot></slot>
        </div>
        <div class="card__footer" v-if="$scopedSlots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<style lang="scss">

    .card {
        border-radius: 0.5rem;
        background-color: var(--foreground__colour);
        box-shadow: 0 2px 8px 0 rgba(150, 150, 150, 0.1);
        overflow: hidden;
    }

    .card__header,
    .card__body,
    .card__footer {
        padding: var(--spacing__small);
    }

</style>