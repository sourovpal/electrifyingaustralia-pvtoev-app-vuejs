<script>

import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import {title, menus} from './menu';
import SettingsMenuGroup from '../../components/Menu/SettingsMenuGroup.vue';
import './style.scss';
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
  <section class="d-flex flex-row">
    <SettingsMenuGroup :menus="menus" :title="title" />
    <router-view></router-view>
  </section>
</template>

<style>

</style>