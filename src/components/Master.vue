<script setup>
    import { onMounted } from 'vue';
    import SidebarNav from '../components/SidebarNav.vue';
    import { useAppStore } from '@stores';
    import { useAuthStore, isAuthorized } from '@stores/auth';
    import MobileToolsBar from '@components/MobileToolsBar.vue';

    const appStore = useAppStore();
    const authStore = useAuthStore();


    onMounted(() => {
        appStore.callFetchAppData();
        authStore.setUser();
        authStore.setAccessToken();
        if (!isAuthorized()) {
            window.location.replace('/login');
        }
    });

</script>

<template>
    <sidebar-nav></sidebar-nav>
    <router-view></router-view>
    <mobile-tools-bar class="d-md-none"></mobile-tools-bar>
</template>
