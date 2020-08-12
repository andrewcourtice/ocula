<template>
    <div class="app">
        <router-view #default="{ Component }">
            <keep-alive>
                <component :is="Component"></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<style lang="scss">

    .app {
        width: 100%;
        margin: 0;
        padding: 0;
        user-select: none;
    }

</style>