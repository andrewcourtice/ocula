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
    }

    .card__header,
    .card__body,
    .card__footer {
        padding: 2rem;
    }

</style>