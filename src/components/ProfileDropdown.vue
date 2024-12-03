<script setup>
  import { onClickOutside } from "@vueuse/core";
  import { ref, computed, onMounted, nextTick } from "vue";
  import { useAuthStore } from "@stores";
  import { useApiRequest } from "@actions";

  import { useConfirm } from "primevue/useconfirm";
  const confirm = useConfirm();

  const profileRef = ref(null);
  const emits = defineEmits(["clickOutside", "logout"]);
  const authStore = useAuthStore();
  const authUser = computed(() => authStore.getUser);


  const confirmSignout = (event) => {

    confirm.require({
      header: 'Sign Out',
      message: 'Are you sure? Do you want to sing out!',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
        style: 'height:2rem;margin-right:auto;'
      },
      acceptProps: {
        label: 'Sign Out',
        severity: 'danger',
        style: 'height:2rem',
      },
      accept: () => authStore.callAuthLogout(),
      reject: () => { }
    });

  };


  const menus = ref([
    {
      title: "Profile",
      icon: "fas fa-user",
      url: "/settings/profile",
    },
    {
      title: "Profile Lock",
      icon: "fas fa-lock",
      url: "/settings/profile",
    },
    {
      title: "Company Settings",
      icon: "fas fa-home",
      url: "/settings/company",
    },
    {
      title: "Team Members",
      icon: "fas fa-users",
      url: "/settings/team-members",
    },
    {
      title: "Role & Permissions",
      icon: "fas fa-user-lock",
      url: "/settings/roles",
    },
    {
      title: "CRM Settings",
      icon: "fas fa-layer-group",
      url: "/settings/crm/leads",
    },
    {
      title: "Settings",
      icon: "fas fa-gear",
      url: "/settings/account",
    },
  ]);

  const toggleLogoutModal = ref(false);

  onClickOutside(profileRef, () => {
    emits("clickOutside", true);
  });

</script>

<template>
  <section @click="emits('clickOutside', true)"
    ref="profileRef"
    class="user-profile">

    <router-link to="/settings/profile"
      class="header border-bottom px-2 py-2 d-flex flex-row justify-cotent-start align-items-center">

      <div class="avatar">
        <img :src="authUser.profile_avatar"
          alt="" />
      </div>

      <div class="details ms-3">

        <span class="text-head fs-16px d-flex justify-content-start align-items-center fw-bold">

          {{ authUser.name??'Unknown name' }}

          <span class="btn bg-primary px-2 text-white py-0 ms-2"
            v-if="authUser.is_owner">
            Owner
          </span>

          <span class="btn bg-primary px-2 text-white py-0 ms-2"
            v-else-if="authUser.role">

            {{ authUser.role }}

          </span>

          <span class="btn bg-warning px-2 text-white py-0 ms-2"
            v-else>
            Guest
          </span>

        </span>

        <span class="text-soft fs-16px d-block">
          {{ authUser.email }}
        </span>

      </div>

    </router-link>

    <div class="body py-2">

      <router-link v-for="(menu, index) in menus"
        :key="index"
        :to="menu.url"
        class="dropdown-item text-head fs-16px px-4 py-2 fw-bold- d-flex justify-content-start align-items-center">

        <span class="icon">

          <font-awesome-icon :icon="menu.icon"
            class="fs-16px text-head">
          </font-awesome-icon>

        </span>

        {{ menu.title }}

      </router-link>

      <div class="my-2 py-1 border-bottom"></div>

      <div @click="confirmSignout()"
        class="logout-btn dropdown-item cursor-pointer fs-16px px-4 py-2 fw-bold d-flex justify-content-start align-items-center">

        <span class="icon">

          <font-awesome-icon icon="fas fa-sign-out"
            class="fs-16px"></font-awesome-icon>

        </span>

        Logout

      </div>

    </div>

  </section>

</template>

<style lang="scss"
  scoped>
  .logout-btn {
    color: #eb0060 !important;
  }

  .user-profile {
    position: fixed;
    left: 4.1rem;
    width: 18rem;
    bottom: 2rem;
    background: #ffffff;
    border-radius: 8px;
    height: max-content;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    z-index: 999;

    .header {
      .avatar {
        min-width: 3rem;
        max-width: 3rem;
        height: 3rem;
        overflow: hidden;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
        border: 1px solid #dddddd;

        img {
          object-fit: contain;
          object-position: top center;
          width: 100%;
          border-radius: 50%;
        }
      }

      .details {
        overflow: hidden;
        white-space: nowrap;

        span {
          line-height: 18px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    .body {
      .dropdown-item {
        .icon {
          width: 30px;
        }
      }
    }
  }
</style>