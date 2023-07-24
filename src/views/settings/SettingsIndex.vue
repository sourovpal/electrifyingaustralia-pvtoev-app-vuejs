<script>

import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import {title, menus} from './menu';
import SettingsMenuGroup from '../../components/Menu/SettingsMenuGroup.vue';

export default {
  name:'SettingsIndex',
    data() {
      return{
        title,
        menus,
      }
    },
    components:{
    MobileHeader,
    Menu,
    SettingsMenuGroup
},
  }
  
</script>

<template>

  <MobileHeader/>
  <section class="">
    <SettingsMenuGroup :menus="menus" :title="title" />
  </section>
  <router-view></router-view>

</template>

<style>

</style>