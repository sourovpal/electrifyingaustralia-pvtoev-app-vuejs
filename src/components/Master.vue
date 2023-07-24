<script>
import SidebarNav from '../components/SidebarNav.vue';
import ProfileDropdown from './ProfileDropdown.vue';

export default {
    name:'Master',
    components:{
    SidebarNav,
    ProfileDropdown
}
}

</script>

<template>
    <SidebarNav></SidebarNav>
    <!-- <ProfileDropdown/> -->
    <router-view></router-view>
</template>

<style>

</style>