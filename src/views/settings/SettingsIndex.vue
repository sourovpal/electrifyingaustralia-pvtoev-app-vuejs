<script setup>
  import MobileHeader from '@components/MobileHeader.vue';
  import Menu from '@components/Menu/Menu.vue';
  import { title, menus } from './menu';
  import SettingsMenuGroup from '@components/Menu/SettingsMenuGroup.vue';
  import './style.scss';
</script>

<template>
  <mobile-header class="d-md-none"></mobile-header>
  <section class="d-flex flex-row">
    <SettingsMenuGroup :menus="menus"
      :title="title" />
    <router-view></router-view>
  </section>
  <br><br><br><br>
</template>

<style scoped
  lang="scss">
  :deep() {
    .content-body {
      margin-bottom: 5rem !important;
    }
  }
</style>