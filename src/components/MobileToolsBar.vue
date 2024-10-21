<script setup>
    import { ref, computed, watchEffect } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import MobileToolsSubMenu from './MobileToolsSubMenu.vue';
    const tools = ref([
        { title: 'Projects', url: '/app', icon: 'fas fa-sitemap', is_active: false, },
        { title: 'Platform', url: '/platform', icon: 'fa-layer-group', is_active: false, },
        { title: 'Library', url: '/library', icon: 'fa-folder-open', is_active: false, },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'fas fa-gear',
            is_active: false,
            children: [

            ]
        },
    ]);

    const disabled = ['timeline-lead-edit', 'timeline-deal-edit'];
    const route = useRoute();
    const router = useRouter();
    const isDisabled = ref(false);

    watchEffect(()=>{
        let routeName = route.name;
        isDisabled.value = false;
        if(routeName && disabled.includes(routeName)) isDisabled.value = true;
    });

    function toggleActiveTool(tool) {
        tools.value.map(item => item.is_active = false);
        tool.is_active = true;
    }

</script>
<template>
    <nav class="mobile-tools-bar" v-if="!isDisabled">
        <div class="nav-box">
            <ul class="nav-container p-0 m-0">
                <li @click="toggleActiveTool(tool)"
                    class="nav__item"
                    :class="{active:tool.is_active}"
                    v-for="(tool, index) in tools"
                    :key="index">
                    <router-link :to="tool.url"
                        class="nav__item-link">
                        <div class="nav__item-icon">
                            <font-awesome-icon :icon="tool.icon"
                                class="fs-16px text-soft"></font-awesome-icon>
                        </div>
                        <span class="nav__item-text fs-14px fw-bold text-soft">{{ tool.title }}</span>
                    </router-link>
                    <!-- <MobileToolsSubMenu v-if="tool.children"></MobileToolsSubMenu> -->
                </li>
            </ul>
        </div>
    </nav>
</template>
<style scoped
    lang="scss">
    nav {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 0px;
        max-width: 100%;
        margin: 0 auto;
        left: 0;
        right: 0;
        z-index: 999;
    }

    .nav-box {
        display: flex;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0px 0px 16px 0px #4444;
        border-radius: 8px;
    }

    .nav-container {
        display: flex;
        width: 100%;
        list-style: none;
        justify-content: space-around;
    }

    .nav__item {
        display: flex;
        position: relative;
        padding: 2px;
    }

    .nav__item.active .nav__item-icon {
        margin-top: -26px;
        box-shadow: 0px 0px 16px 0px #4444;
    }

    .nav__item.active .nav__item-text {
        transform: scale(1);
    }

    .nav__item-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #2f3046;
        text-decoration: none;
    }

    .nav__item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6em;
        background-color: #fff;
        border-radius: 50%;
        height: 46px;
        width: 46px;
        transition: margin-top 250ms ease-in-out, box-shadow 250ms ease-in-out;
    }

    .nav__item-text {
        position: absolute;
        bottom: 0;
        transform: scale(0);
        transition: transform 250ms ease-in-out;
    }
</style>