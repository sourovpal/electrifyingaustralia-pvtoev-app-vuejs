<script>

import MobileHeader from '../../components/MobileHeader.vue';
import Menu from '../../components/Menu/Menu.vue';
import DataTable from "./components/DataTable.vue";
import {title, menus} from './menu';
export default {
  name:'LibraryIndex',
    data() {
      return{
        title,
        menus,
      }
    },
    components:{
      MobileHeader,
      Menu,
      DataTable,
    },
  }
  
</script>

<template>

  <MobileHeader/>
  <section class="">
    <Menu :menus="menus" :title="title" />
  </section>
  <DataTable></DataTable>
</template>

<style>

</style>