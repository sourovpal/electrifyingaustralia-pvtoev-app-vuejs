<script>
import SidebarNav from '../components/SidebarNav.vue';

export default {
    name:'Master',
    components:{
        SidebarNav,
    }
}

</script>

<template>
    <SidebarNav></SidebarNav>
    <router-view></router-view>
</template>

<style>

</style>