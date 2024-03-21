<script>

import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import {FetchLeadStatus} from '../../actions/CrmLeads';
import {title, menus} from './menu';

export default {
  name:'PlatformIndex',
    data() {
      return{
        title,
        menus:[],
      }
    },
    components:{
      MobileHeader,
      Menu,
    },
    async mounted() {
      console.log('Mounted');
    },
    async created() {
      console.log('created');
      this.menus = await menus();
    },
  }
  
</script>

<template>

  <MobileHeader/>
  <section class="d-flex flex-row overflow-hidden position-relative">
    <Menu :menus="menus" :title="title" />
    <router-view></router-view>
  </section>

</template>

<style>

</style>