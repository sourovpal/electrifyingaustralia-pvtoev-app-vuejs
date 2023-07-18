<script>

import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import Dashboard from '../../components/Datatable/Dashboard.vue';
import {title, menus} from './menu';
export default {
  name:'PlatformIndex',
    data() {
      return{
        title,
        menus,
      }
    },
    components:{
      MobileHeader,
      Menu,
      Dashboard
    },
  }
  
</script>

<template>

  <MobileHeader/>
  <section class="">
    <Menu :menus="menus" :title="title" />
  </section>
  <router-view></router-view>

</template>

<style>

</style>