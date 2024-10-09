<script setup>
    import {   onMounted, computed, ref } from 'vue';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import SlideUpDown from 'vue-slide-up-down';
    import { useRoute } from 'vue-router';

    const props = defineProps({
        isActiveMenu: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: "This is Sub Menu",
        },
        path: {
            type: String,
            default: '/',
        },
        icon: {
            type: String,
            default: 'fas fa-user',
        },
    });

    const route = useRoute();
    const isActiveMenu = ref(false);

    function isActiveRoute(search = '') {
        var routeFullPath = route.fullPath;
        isActiveMenu.value = (routeFullPath.search(search) > -1) ? true : false;
    }

    onMounted(() => {
        isActiveRoute(props.path);
    });

</script>
<template>
    <slide-up-down :active="isActiveMenu">
        <div class="nav-item"
            v-for="(childMenu, index) in children"
            :key="index">
            <router-link class="nav-link mb-1"
                :to="{path:childMenu.path, query:childMenu.query??{}}"
                :class="{'sub-link-active':isActiveMenu}">
                <span class="nav-icon text-soft">
                    <font-awesome-icon :style="{'height':'10px', 'width':'10px',}"
                        :icon="`fas fa-circle-dot`" />
                </span>
                <span class="nav-title text-soft ms-2">{{ childMenu.label }}</span>
            </router-link>
        </div>
    </slide-up-down>
</template>

<style scoped
    lang="scss">
    .nav-link {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 6px 8px;
        border-radius: 8px;
        line-height: 20px;

        &:hover {
            background-color: #f4f6f6;
        }

        .nav-icon {
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .nav-title {}
    }
</style>