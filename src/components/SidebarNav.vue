<script setup>
  import { computed, reactive, ref } from "vue";
  import NotificationsDropdown from "./Notification/NotificationsDropdown.vue";
  import ProfileDropdown from "./ProfileDropdown.vue";
  import { useDebounceFn } from "@vueuse/core";
  import { useAuthStore, useNotificationStore } from "@stores";

  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const authUser = computed(() => authStore.getUser);
  const unseenNotification = computed(() => notificationStore.getUnseen);

  const toggleNotification = ref(false);
  const toggleProfile = ref(false);


  const topNavbarItems = reactive([
    {
      unique_id: "nav-home",
      label: "CRM",
      path: "/app",
      icon: "dashboard_customize",
    },
    {
      unique_id: "nav-platform",
      label: "Platform",
      path: "/platform",
      icon: "leaderboard",
    },
    {
      unique_id: "nav-map",
      label: "Map",
      path: "/map",
      icon: "explore",
    },
    {
      unique_id: "nav-library",
      label: "Library",
      path: "/library",
      icon: "folder_copy",
    },
    // {
    //   unique_id: "nav-payments",
    //   label: "Payments",
    //   path: "/payments",
    //   icon: "fas fa-hand-holding-usd",
    //   icon_w: "28px",
    //   icon_h: "28px",
    // },
  ]);

  const bottomNavbarItems = reactive([
    // {
    //   unique_id: "nav-reporting",
    //   label: "Reporting",
    //   path: "/reporting",
    //   icon: "fas fa-chart-pie",
    // },
    // {
    //   unique_id: "nav-learn",
    //   label: "Learn",
    //   path: "/learn",
    //   icon: "fas fa-book-open",
    // },
    // {
    //   unique_id: "nav-feedback",
    //   label: "Feedback",
    //   path: "/feedback",
    //   icon: "fas fa-message",
    // },
    // {
    //   unique_id: "nav-help",
    //   label: "Help",
    //   path: "/help",
    //   icon: "fas fa-circle-info",
    // },
    // {
    //   unique_id: "nav-setting",
    //   label: "Settings",
    //   path: "/settings",
    //   icon: "fas fa-cog",
    // },
    {
      unique_id: "nav-notification",
      label: "Notification",
      path: "/notification",
      icon: "notifications",
    },
    {
      unique_id: "nav-profile",
      label: "Profile",
      path: "/settings",
      icon: authUser.profile_avatar,
    },
  ]);

  const handleToggleNotification = useDebounceFn(() => {
    toggleNotification.value = !toggleNotification.value;
  }, 100);

  const handleToggleProfile = useDebounceFn(() => {
    toggleProfile.value = !toggleProfile.value;
  }, 100);

</script>

<template>
  <aside class="main-left-navbar parent-navbar d-none d-xl-block">

    <div class="navbar">

      <div class="top-navbar">

        <div v-for="(item, index) in topNavbarItems"
          :key="index"
          class="nav-item mb-0 d-flex flex-column justify-content-start align-items-center">

          <router-link :to="item.path"
            class="nav-link d-flex flex-column justify-content-center align-items-center">

            <Avatar style="--p-avatar-width:2.5rem;--p-avatar-height:2.5rem;"
              v-tippy="{ content: item.label, placement: 'right' }">

              <material-icon :name="item.icon"
                class="text-soft"
                size="26"></material-icon>

            </Avatar>

            <span class="nav-title d-block">{{ item.label }}</span>

          </router-link>

        </div>

      </div>

      <div class="bottom-navbar">

        <div v-for="(item, index) in bottomNavbarItems"
          :key="index"
          class="nav-item mb-0 d-flex flex-column justify-content-start align-items-center">

          <!-- Profile -->
          <template v-if="item.unique_id == 'nav-profile'">
            <div @click="handleToggleProfile"
              class="nav-link d-flex flex-column justify-content-center align-items-center">

              <Avatar style="--p-avatar-width:2.5rem;--p-avatar-height:2.5rem;"
                :image="authUser.profile_avatar"
                v-tippy="{ content: item.label, placement: 'right' }" />

              <span class="nav-title d-block">
                {{ item.label }}
              </span>


            </div>

            <profile-dropdown @click-outside="handleToggleProfile"
              v-if="toggleProfile">
            </profile-dropdown>

          </template>



          <!-- Notification -->
          <div v-else-if="item.unique_id == 'nav-notification'">

            <div @click="handleToggleNotification"
              class="nav-link nav-notification d-flex flex-column justify-content-center align-items-center">

              <span v-if="unseenNotification"
                class="notification-badge bg-danger">

                {{ (unseenNotification < 9)?
                  unseenNotification: '9+'
                  }}
                  </span>

                  <Avatar style="--p-avatar-width:2.5rem;--p-avatar-height:2.5rem;"
                    v-tippy="{ content: item.label, placement: 'right' }">

                    <material-icon :name="item.icon"
                      class="text-soft"
                      size="26"></material-icon>

                  </Avatar>

                  <span class="nav-title d-block">{{ item.label }}</span>
            </div>

            <transition name="fade">
              <notifications-dropdown @click-outside="handleToggleNotification"
                class="d-none d-lg-block"
                v-if="toggleNotification"></notifications-dropdown>
            </transition>

          </div>

          <router-link :to="item.path"
            v-else
            class="nav-link d-flex flex-column justify-content-center align-items-center">

            <span class="nav-icon"
              v-tippy="{ content: item.label, placement: 'right' }">
              <font-awesome-icon :style="{ height: '24px', width: '24px' }"
                :icon="item.icon" />
            </span>

            <span class="nav-title d-block">{{ item.label }}</span>

          </router-link>

        </div>

      </div>

    </div>

  </aside>

</template>

<style lang="scss"
  scoped>
  .profile-avatar {
    width: 100%;
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .nav-notification {
    position: relative;

    .notification-badge {
      position: absolute;
      top: -13px;
      right: 0;
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
  }

  .main-left-navbar {
    width: var(--main-left-navbar-width);
    background: white;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid var(--layout-border-color);
    z-index: 99;

    &:deep(.custom-scrollbar) {

      .scrollbar__scroller,
      .scrollbar__content {
        height: 100vh;
      }
    }

    .navbar {
      display: flex;
      flex-direction: column;
      box-shadow: none !important;
      height: 100%;
      flex-wrap: nowrap;

      .top-navbar {
        width: 100%;
      }

      .bottom-navbar {
        width: 100%;
        margin-top: 100%;
      }

      .nav-item {
        .nav-link {
          --nav-bg-color: #ffffff;
          --nav-icon-color: #6b7c92;
          --nav-active-color: var(--crm-color);
          --nav-border-color: transparent;
          --nav-text-color: #8094ae;

          &.router-link-active {
            --nav-bg-color: transparent !important;
            --nav-active-color: var(--crm-color) !important;
            --nav-icon-color: var(--crm-color) !important;
            --nav-border-color: var(--crm-color) !important;
            --nav-text-color: var(--crm-color) !important;
            transition: all 0.3s;
          }

          cursor: pointer;
          transform: scale(0.8);

          .nav-title {
            margin-top: 3px;
            line-height: 20px;
            font-size: 14px;
            color: var(--nav-text-color);
            letter-spacing: 0.5px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 4.2rem;
            text-align: center;
            user-select: none;
          }
        }
      }
    }
  }
</style>