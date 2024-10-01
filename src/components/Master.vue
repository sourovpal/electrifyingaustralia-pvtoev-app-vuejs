<script setup>
import {onMounted} from 'vue';
import SidebarNav from '../components/SidebarNav.vue';
import {useAppStore} from '../stores/app';
import {useAuthStore, isAuthorized} from '../stores/auth';
const appStore = useAppStore();
const authStore = useAuthStore();

onMounted(()=>{
    appStore.fetchAppData();
    authStore.setUser();
    authStore.setAccessToken();
    if(!isAuthorized()){
        window.location.replace('/login');
    }
});

</script>

<template>
    <vue-progress-bar></vue-progress-bar>
    <SidebarNav></SidebarNav>
    <router-view></router-view>
</template>

<style>

</style>