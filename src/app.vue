<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<style lang="scss">

    .app {
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        padding: var(--spacing__small);
        user-select: none;
    }

</style>