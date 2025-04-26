<script setup>
import { Skeletor } from "vue-skeletor";
</script>

<template>
  <router-link to="#" class="d-block">
    <div class="alert-item px-3 py-2 d-flex justify-context-start">
      <div class="alert-icon">
        <Skeletor
          style="width: 100%; height: 100%; border-radius: 50%"
        ></Skeletor>
      </div>
      <div class="alert-details ms-3">
        <div class="alert-title fs-14px text-head">
          <Skeletor
            class="d-block mb-2"
            style="width: 100%; height: 0.5rem"
          ></Skeletor>
          <Skeletor
            class="d-block mb-2"
            style="width: 60%; height: 0.5rem"
          ></Skeletor>
          <Skeletor
            class="d-block mb-2"
            style="width: 60%; height: 0.5rem"
          ></Skeletor>
        </div>
        <div
          class="created-at text-soft fs-12px py-1 d-flex justify-content-between align-items-center"
        >
          <Skeletor style="width: 25%; height: 0.3rem"></Skeletor>
        </div>
      </div>
      <div class="dot-menu">
        <div class="dropdown ms-2 position-relative">
          <Skeletor
            style="width: 1.5rem; height: 1.5rem; border-radius: 50%"
          ></Skeletor>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style lang="scss" scoped>
.alert-item {
  transition: all 0.3s ease-in-out;
  &.is-not-seen,
  &:hover {
    background: #e6ebf1;
  }
  .alert-icon {
    min-width: 3.5rem;
    max-width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    flex: 1;
    padding: 4px;
    border: 1px solid #dddddd;
  }
  .alert-title {
    line-height: 16px;
  }
  .alert-details {
    flex-grow: 1;
  }
  .dropdown-toggler {
    //   opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover {
    .dropdown-toggler {
      opacity: 1;
    }
  }
}
.toolbar-btn {
  border-radius: 50% !important;
  background: transparent !important;
}
.dropdown {
  .dropdown-item {
    .icon {
      width: 1.5rem;
      display: inline-block;
    }
  }
}
</style>