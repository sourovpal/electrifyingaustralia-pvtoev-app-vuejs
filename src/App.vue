<script>
import SidebarNav from './components/SidebarNav.vue';
import Menu from './components/Menu/Menu.vue';
import MobileHeader from './components/MobileHeader.vue';
import './asset/global.scss';

export default {
  components:{
    SidebarNav,
    Menu,
    MobileHeader,
  },
  data(){
    return {
    }
  },
}
</script>

<template>
  <router-view></router-view>
</template>