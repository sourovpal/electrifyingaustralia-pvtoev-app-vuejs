<script>
import SidebarNav from '../components/SidebarNav.vue';
export default {
    name:'Master',
    components:{
        SidebarNav,
    },    
    mounted() {
        this.$store.dispatch('setCookiesInAppData');
        this.$store.dispatch('fetchAppData');
    },
}

</script>

<template>
    <SidebarNav></SidebarNav>
    <router-view></router-view>
    <vue-progress-bar></vue-progress-bar>
</template>

<style>

</style>