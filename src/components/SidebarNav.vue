<script setup>
  import CustomScrollbar from 'custom-vue-scrollbar';
  import { reactive } from "vue";
  import { storeToRefs } from "pinia";
  import { useToast } from "vue-toast-notification";
  import ProfileDropdown from "./ProfileDropdown.vue";
  import NotificationsDropdown from "./NotificationsDropdown.vue";
  import Storage from "../helpers/Storage";
  import { CONFIG } from "@config";
  import { useAppStore } from "@stores";
  import { useLeadStore } from "@stores";
  const userStorage = new Storage(CONFIG.VITE_AUTH_USER);
  const appStorage = new Storage(CONFIG.VITE_AUTH_APP);
  const securityStorage = new Storage(CONFIG.VITE_AUTH_TOKEN);

  const leadStore = useLeadStore();
  const appStore = useAppStore();

  const { getLeadPrevUrl } = storeToRefs(leadStore);

  const $toast = useToast(CONFIG.TOAST);

  const topNavbarItems = reactive([
    {
      unique_id: 'nav-home',
      label: 'Projects',
      path: '/app',
      icon: 'fas fa-sitemap',
    },
    {
      unique_id: 'nav-platform',
      label: 'Platform',
      path: '/platform',
      icon: 'fas fa-layer-group',
    },
    {
      unique_id: 'nav-map',
      label: 'Map',
      path: '/map',
      icon: 'fas fa-magnifying-glass-location',
    },
    {
      unique_id: 'nav-library',
      label: 'Library',
      path: '/library',
      icon: 'fas fa-folder-open',
    },
    {
      unique_id: 'nav-payments',
      label: 'Payments',
      path: '/payments',
      icon: 'fas fa-hand-holding-usd',
      icon_w: '28px',
      icon_h: '28px',
    },
  ]);

  const bottomNavbarItems = reactive([
    {
      unique_id: 'nav-reporting',
      label: 'Reporting',
      path: '/reporting',
      icon: 'fas fa-chart-pie',
    },
    {
      unique_id: 'nav-learn',
      label: 'Learn',
      path: '/learn',
      icon: 'fas fa-book-open',
    },
    {
      unique_id: 'nav-feedback',
      label: 'Feedback',
      path: '/feedback',
      icon: 'fas fa-message',
    },
    {
      unique_id: 'nav-help',
      label: 'Help',
      path: '/help',
      icon: 'fas fa-circle-info',
    },
    {
      unique_id: 'nav-setting',
      label: 'Settings',
      path: '/settings',
      icon: 'fas fa-cog',
    },
    {
      unique_id: 'nav-notification',
      label: 'Notification',
      path: '/notification',
      icon: 'fas fa-bell',
    },
    {
      unique_id: 'nav-profile',
      label: 'Profile',
      path: '/profile',
      icon: 'fas fa-user',
    },
  ]);


  async function logoutHandler() {
    try {
      const res = await LogoutAction();
      this.userStorage.remove();
      this.appStorage.remove();
      this.securityStorage.remove();
      try {
        const { message } = res;
        this.$toast[message.type](message.text);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        if (res) {
          window.location.replace("/login");
        }
      }, 1000);
    } catch (error) {
      this.$toast["error"](error.message);
    }
  }
</script>

<template>
  <aside class="main-left-navbar parent-navbar">
    <CustomScrollbar class="custom-scrollbar"
      thumbWidth="8">
      <div class="navbar">
        <div class="top-navbar">
          <div v-for="(item, index) in topNavbarItems"
            :key="index"
            class="nav-item mb-0 d-flex flex-column justify-content-start align-items-center">
            <router-link :to="item.path"
              class="nav-link d-flex flex-column justify-content-center align-items-center">
              <span class="nav-icon"
                v-tippy="{ content: item.label, placement: 'right' }">
                <font-awesome-icon :style="{'height':item.icon_h??'24px', 'width':item.icon_w??'24px',}"
                  :icon="item.icon" />
              </span>
              <span class="nav-title d-block">{{ item.label }}</span>
            </router-link>
          </div>

        </div>
        <div class="bottom-navbar">


          <div v-for="(item, index) in bottomNavbarItems"
            :key="index"
            class="nav-item mb-0 d-flex flex-column justify-content-start align-items-center">

            <!-- Profile -->
            <div v-if="item.unique_id == 'nav-profile'"
              class="nav-link d-flex flex-column justify-content-center align-items-center">
              <span class="nav-icon"
                v-tippy="{ content: item.label, placement: 'right' }">
                <font-awesome-icon :style="{'height':'24px', 'width':'24px',}"
                  :icon="item.icon" />
              </span>
              <span class="nav-title d-block">{{ item.label }}</span>
            </div>

            <!-- Notification -->
            <div v-else-if="item.unique_id == 'nav-notification'"
              class="nav-link d-flex flex-column justify-content-center align-items-center">
              <span class="nav-icon"
                v-tippy="{ content: item.label, placement: 'right' }">
                <font-awesome-icon :style="{'height':'24px', 'width':'24px',}"
                  :icon="item.icon" />
              </span>
              <span class="nav-title d-block">{{ item.label }}</span>
            </div>


            <router-link :to="item.path"
              v-else
              class="nav-link d-flex flex-column justify-content-center align-items-center">
              <span class="nav-icon"
                v-tippy="{ content: item.label, placement: 'right' }">
                <font-awesome-icon :style="{'height':'24px', 'width':'24px',}"
                  :icon="item.icon" />
              </span>
              <span class="nav-title d-block">{{ item.label }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </CustomScrollbar>
  </aside>
</template>

<style lang="scss"
  scoped>
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
          --nav-bg-color: #f4f6f6;
          --nav-icon-color: #6b7c92;
          --nav-active-color: #2196F3;
          --nav-border-color: transparent;
          --nav-text-color: #8094ae;

          &.router-link-active {
            --nav-bg-color: transparent !important;
            --nav-active-color: #2196F3 !important;
            --nav-icon-color: #2196F3 !important;
            --nav-border-color: #2196F3 !important;
            --nav-text-color: #2196F3 !important;
            transition: all 0.3s;
          }

          cursor: pointer;
          transform: scale(0.8);

          .nav-icon {
            width: 3rem;
            height: 3rem;
            background-color: var(--nav-bg-color);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 15px;
            border: 2px solid var(--nav-border-color);

            svg {
              color: var(--nav-icon-color);
            }
          }

          .nav-title {
            margin-top: 3px;
            line-height: 20px;
            font-size: 14px;
            font-weight: 600;
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