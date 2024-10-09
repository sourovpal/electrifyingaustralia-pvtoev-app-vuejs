<script setup>
  import {   onMounted, computed } from 'vue';
  import CustomScrollbar from 'custom-vue-scrollbar';
  import MenuItem from './MenuItem.vue';
  const props = defineProps({
    menus: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: 'Menu Title'
    }
  });

</script>

<template>
  <aside class="sidebar-nav">
    <div class="nav-header text-soft">
      {{ title }}
    </div>
    <div class="nav-menu">
      <CustomScrollbar class="custom-scrollbar" thumbWidth="8">
        <menu-item v-for="(item, index) in menus"
          :key="index"
          v-bind="item" />
      </CustomScrollbar>
    </div>
  </aside>
</template>

<style scoped
  lang="scss">
  .sidebar-nav {
    width: var(--child-left-navbar-width);
    margin-left: var(--main-left-navbar-width);
    border-right: 1px solid var(--layout-border-color);

    .nav-header {
      font-size: 24px;
      font-weight: 600;
      padding: 16px 8px 16px 17px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    &:deep(.nav-menu) {
      .custom-scrollbar{
        height: 90vh;
      }
    }
  }
</style>