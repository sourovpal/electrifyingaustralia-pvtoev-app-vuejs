<script setup>
  import { ref, onMounted } from 'vue';
  import MobileHeader from '@components/MobileHeader.vue';
  import Menu from '@components/Menu/Menu.vue';
  import { title, menus } from './menu';

  const menusData = ref([]);

  onMounted(async () => menusData.value = await menus());

</script>




<template>
  <mobile-header class="d-md-none"></mobile-header>
  <section class="d-flex flex-row platform">
    <Menu :menus="menusData"
      :title="title" />
    <router-view></router-view>
  </section>

</template>

<style scoped
  lang="scss">
  .platform {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border: 0;
    width: 100%;
  }
</style>