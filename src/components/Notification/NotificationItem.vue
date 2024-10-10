<script setup>
  import { formatTimeAgo } from "@helpers";
  import { ref } from "vue";
  import { useIntersectionObserver, useDebounceFn } from "@vueuse/core";
  const props = defineProps({
    notification: { type: Object, default: {} },
    alert_type: {
      default({ notification }) {
        return notification.alert_type;
      }
    },
    recerver: {
      default({ notification }) {
        if (notification.recerver) return notification.recerver;
        return null;
      }
    }
  });

  const alertItemRef = ref(null);
  const isLoading = ref(false);

  const handleUpdateNotificationSeen = () => {
    setTimeout(() => {
      props.notification.seen_at = new Date();
    }, 5000);
  };

  const handleNotificationSeen = useDebounceFn(
    handleUpdateNotificationSeen,
    2000
  );

  const { stop } = useIntersectionObserver(
    alertItemRef,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && !isLoading.value && !props.notification.seen_at) {
        handleNotificationSeen({ stop });
      }
    }
  );

  function userNameFormat(user) {
    if (user && user.name) return user.name;
    return 'https://placehold.co/200x200';
  }

  function notificationIconFormat(user) {
    if (user && user.profile_avatar) return user.profile_avatar;
  }

  function eventTitleFormat(model) {
    if (model) return model.lead_title ?? 'Untitled lead\'s';
  }

</script>

<template>
  <router-link to="#"
    class="d-block">
    <div ref="alertItemRef"
      :class="{ 'is-not-seen': recerver?.seen_at }"
      class="alert-item px-3 py-2 d-flex justify-context-start">
      <div class="alert-icon">
        <img :src="notificationIconFormat(notification.user)" />
      </div>
      <div class="alert-details ms-3">
        <div class="alert-title fs-14px text-head">
          <strong class="me-1">{{ userNameFormat(notification.user) }},</strong>
          <span class="me-1">
            {{ notification.message }}
          </span>
          <strong class="">{{ eventTitleFormat(notification.model)}}</strong>
        </div>
        <div class="created-at text-soft fs-12px py-1 d-flex justify-content-between align-items-center">
          <span>
            {{ formatTimeAgo(notification.created_at)?.replace("a few seconds ago", "just now")}}</span>
        </div>
        <div v-if="notification.action"
          class="d-flex justify-content-between align-items-center">
          <button class="btn btn-primary btn-sm py-1">Confirm</button>
          <button class="btn btn-danger btn-sm py-1">Cancel</button>
        </div>
      </div>
      <div class="dot-menu">
        <div class="dropdown ms-2 position-relative">
          <button
            class="toolbar-btn dropdown-toggler me-n1 btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center"
            data-mdb-toggle="dropdown">
            <font-awesome-icon icon="fas fa-ellipsis-vertical"
              class="text-soft fs-16px"></font-awesome-icon>
          </button>
          <div class="dropdown-menu custom-dropdown-menu dropdown-menu-end me-n3">
            <div class="dropdown-item cursor-pointer fw-bold">
              <span class="icon">
                <font-awesome-icon icon="fas fa-check"
                  class="text-head fs-16px"></font-awesome-icon>
              </span>
              Make as read
            </div>
            <div class="dropdown-item cursor-pointer fw-bold">
              <span class="icon">
                <font-awesome-icon icon="fas fa-eye-slash"
                  class="text-head fs-14px"></font-awesome-icon>
              </span>
              Hide
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style lang="scss"
  scoped>
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

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
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