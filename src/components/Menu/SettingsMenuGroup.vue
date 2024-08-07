<script>
  import CustomScrollbar from 'custom-vue-scrollbar';

  export default {
    components: {
      CustomScrollbar
    },
    data() {
      return {
      }
    },
    props: ['menus', 'title'],
  }
</script>

<template>
  <nav class="sidebar--submenu d-none d-md-block">
    <CustomScrollbar thumbWidth="8">
      <div class="submenu-header">
        <h1>{{ title }}</h1>
      </div>

      <div class="submenu-body">

        <div v-for="menu in menus"
          :class="`submenu-group`"
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
  .sidebar--submenu {
    top: 0;
    background-color: #f5f7fa;
    width: var(--child-left-navbar-width);
    max-height: 100vh;
    height: 100vh;
    margin-left: var(--main-left-navbar-width);
    overflow: hidden;
    border-right: 1px solid #dddddd;
    position: relative;
    z-index: 99;
    padding-bottom: 40px;

    @media (min-width: 767px) {
      width: 13rem;
      min-width: 13rem;
    }

    @media (min-width: 1200px) {
      width: 18rem;
      min-width: 18rem;
    }

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
      font-size: .8125rem;
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
        padding: 0.5rem 0.5rem 0.5rem 1.5rem;
        margin: 0 1rem 0 1.5rem;
        cursor: pointer;
        transition: background-color .2s ease;
        display: block;
        position: relative;
        font-size: .8125rem;
        border-radius: 0.25rem;
        color: #3e4c59;

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
  .sidebar--submenu .scrollbar__wrapper {
    height: 100vh !important;
  }

  .sidebar--submenu .scrollbar__wrapper .scrollbar__scroller {
    height: 100% !important;
  }
</style>