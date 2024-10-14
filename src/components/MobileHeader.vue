<script setup>
import PvToEvLogo from "@assets/logo/pvtoev.png";
import NotificationsDropdown from "./Notification/NotificationsDropdown.vue";
import ProfileDropdown from "./ProfileDropdown.vue";
import { ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
const toggleNotification = ref(false);
const toggleProfile = ref(false);

const handleToggleNotification = useDebounceFn(() => {
  toggleNotification.value = !toggleNotification.value;
}, 100);

const handleToggleProfile = useDebounceFn(() => {
  toggleProfile.value = !toggleProfile.value;
}, 100);
</script>

<template>
  <nav class="navbar navbar-mobile d-flex shadow-0 border-bottom px-2">
    <div class="navbar-left">
      <div class="nav-logo">
        <img class="logo" :src="PvToEvLogo" alt="" />
      </div>
    </div>
    <div class="navbar-right">
      <div>
        <button class="toolbar-btn btn btn-light btn-floating me-3">
          <font-awesome-icon
            icon="fas fa-search"
            class="fs-16px text-soft"
          ></font-awesome-icon>
        </button>
      </div>
      <div>
        <button
          @click="handleToggleNotification"
          class="toolbar-btn btn btn-light btn-floating me-3 position-relative"
        >
          <span class="notification-badge bg-danger">9+</span>
          <font-awesome-icon
            icon="fas fa-bell"
            class="fs-16px text-soft"
          ></font-awesome-icon>
        </button>
        <transition name="fade">
          <notifications-dropdown
            @click-outside="handleToggleNotification"
            class="d-block d-lg-none position-set"
            v-if="toggleNotification"
          ></notifications-dropdown>
        </transition>
      </div>
      <div>
        <button
          @click="handleToggleProfile"
          class="toolbar-btn btn btn-light btn-floating"
        >
          <font-awesome-icon
            icon="fas fa-user"
            class="fs-16px text-soft"
          ></font-awesome-icon>
        </button>
        <transition name="fade">
          <profile-dropdown
            @click-outside="handleToggleProfile"
            class="d-block d-lg-none position-set"
            style="right: 1rem !important"
            v-if="toggleProfile"
          ></profile-dropdown>
        </transition>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"
  scoped>
.position-set:deep() {
  top: 3.6rem !important;
  right: 4rem !important;
  left: auto !important;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -12px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border-radius: 50%;
  color: #ffffff;
  padding: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.nav-logo {
  width: 100px;

  img {
    width: 100%;
    object-fit: contain;
  }
}

.navbar.navbar-mobile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  width: 100%;
  height: 3.5rem;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  z-index: 99;

  .navbar-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      font-size: 1.375rem;
      font-weight: 600;
    }
  }

  .navbar-right {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .title {
      font-size: 1.375rem;
      font-weight: 600;
    }
  }
}
</style>