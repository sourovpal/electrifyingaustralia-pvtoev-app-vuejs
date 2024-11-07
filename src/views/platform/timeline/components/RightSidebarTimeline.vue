<script setup>
  import { ref, computed } from 'vue';
  import { usePlatformStore } from '@stores';
  import CustomScrollbar from "custom-vue-scrollbar";
  import RightSidebarContacts from './RightSidebarContacts.vue';
  import SectionTabs from "./SectionTabs.vue";


  const platformStore = usePlatformStore();
  const toggleRightSidebar = computed(() => platformStore.getToggleRightSidebar);

</script>
<template>
  <div class="col-right"
    :class="{ show: toggleRightSidebar }">

    <scroll-panel :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
      style="width:100%;height:100vh;">

      <right-sidebar-contacts></right-sidebar-contacts>
      <section-tabs></section-tabs>
      <div style="height: 15rem"></div>

    </scroll-panel>

  </div>
</template>

<style lang="scss"
  scoped>
  .cursor-no-drop {
    cursor: no-drop;
  }

  .col-right {
    flex-grow: 1;
    width: 24rem;
    background-color: #ffffff;

    /* @media only screen and (min-width: 767px) and (max-width: 1500px) { */
    @media only screen and (max-width: 991.99px) {
      position: absolute;
      right: -30rem;
      transition: all 0.5s ease-in-out;
      height: 100vh;

      &.show {
        right: 0px !important;
      }
    }

    @media only screen and (min-width: 1px) and (max-width: 991px) {
      &.show {
        width: calc(100%) !important;
      }
    }
  }

  /* 
    .dropdown-box {
      .dropdown-header {
        &.show {
          button {
            transform: rotate(-180deg);
          }
        }

        button {
          transition: transform 0.3s ease-in-out;
        }
      } */

  /* .dropdown-body {
        overflow: hidden;
        transition: height 0.3s ease-in-out;
        position: relative;

        .lead-files {
          .empty-state {
            -webkit-box-align: center;
            align-items: center;
            background-color: #e5f4ff;
            border: 2px solid #b3ddff;
            -webkit-border-radius: 0.25rem;
            border-radius: 0.25rem;
            color: #0062b3;
            display: flex;
            flex-direction: column;
            font-size: 0.875rem;
            gap: 0.25rem;
            justify-content: center;
            line-height: 1.25;
            min-height: 9.25rem;
            padding: 1rem;
            text-align: center;
            user-select: none;
            width: 100%;

            .btn-text {
              background: transparent;
              border: 0;
              color: #007ee5;
              padding: 0;
              text-decoration: underline;
            }
          }
        }

        .save-notes-btn {
          position: absolute;
          bottom: 18px;
          right: 25px;
          z-index: 999999;

          button {
            font-weight: bold;
            padding: 3px 6px;
            background-color: #fff3c4 !important;
          }
        }
      } */
  /* } */
  /* } */
</style>