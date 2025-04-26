<script setup>
  import CustomScrollbar from 'custom-vue-scrollbar';
  const props = defineProps({
    menus: { type: Array, default: [] },
    title: { type: String, default: null },
  });
</script>

<template>
  <nav class="sidebar-submenu d-none d-md-block">
    <CustomScrollbar thumbWidth="8">
      <div class="submenu-header d-none">
        <h1 class="text-soft mb-0">{{ title }}</h1>
      </div>

      <div class="submenu-body">

        <div v-for="menu in menus"
          :class="`submenu-group mt-2`"
          :key="menu.label">
          <a class="submenu-heading d-flex justify-content-start align-items-center">
            <span class="icon d-flex justify-content-start align-items-center"
              v-html="menu.icon"></span>
            {{ menu.label }}
          </a>
          <div class="submenu-list">
            <router-link class="submenu-link"
              v-for="sub in menu.children"
              :to="sub.path"
              :key="sub.label"
              v-html="sub.label"></router-link>
          </div>
        </div>

      </div>
    </CustomScrollbar>

  </nav>
</template>

<style scoped
  lang="scss">
  .sidebar-submenu {
    top: 0;
    background-color: #f5f7fa;
    min-width: var(--child-left-navbar-width);
    max-width: var(--child-left-navbar-width);
    max-height: 100vh;
    height: 100vh;
    margin-left: var(--main-left-navbar-width);
    overflow: hidden;
    border-right: 1px solid var(--layout-border-color);
    position: relative;
    z-index: 9;
    padding-bottom: 40px;

    .submenu-header {
      padding: 1.4rem;
      padding-bottom: 0.25rem;

      h1 {
        color: #1f2933;
        font-size: 1.5rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        margin-bottom: 1rem;
        font-weight: 600;
      }
    }
  }

  .submenu-group {
    margin-bottom: 10px;

    .submenu-heading {
      padding: 1rem 1.5rem 0.5rem;
      font-weight: 700;
      margin: 0;
      color: #616e7c;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: default;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      gap: 0.375rem;

      .icon {
        width: 20px;
      }
    }

    .submenu-list {
      .submenu-link {
        padding: 0.3rem 0.5rem 0.3rem 1.5rem;
        margin: 0 1rem 0 1.5rem;
        cursor: pointer;
        transition: background-color .2s ease;
        display: block;
        position: relative;
        border-radius: 0.25rem;
        color: #8094ae;

        &:hover,
        &:focus,
        &.router-link-active {
          background: rgba(0, 126, 229, .12);
          color: #007ee5;
        }
      }
    }
  }
</style>
<style>
  .sidebar-submenu .scrollbar__wrapper {
    height: 100vh !important;
  }

  .sidebar-submenu .scrollbar__wrapper .scrollbar__scroller {
    height: 100% !important;
  }
</style>
