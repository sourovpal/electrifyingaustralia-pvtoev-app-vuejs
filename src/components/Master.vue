<script>
import SidebarNav from '../components/SidebarNav.vue';
export default {
    name:'Master',
    components:{
        SidebarNav,
    },
    created() {
        this.$Progress.start();
        this.$router.beforeEach((to, from, next) => {
            if (to.meta.progress) {
                this.$Progress.start();
            }
            return next();
        });
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