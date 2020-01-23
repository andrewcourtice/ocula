<template>
    <div class="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<style lang="scss">

    .app {
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        padding: 0;
        user-select: none;
    }

</style>