<script setup>
  import { formatTimeAgo } from "@helpers";
  import { ref, reactive, watch, computed, onMounted, toRefs, createApp, defineComponent } from "vue";
  import { useIntersectionObserver, useDebounceFn } from "@vueuse/core";
  import { useAppStore, useAuthStore, useNotificationStore } from '@stores';
  import { useApiRequest } from '@actions';
  import { useRouter } from 'vue-router';

  const props = defineProps({
    notification: { type: Object, default: {} },
    alert_type: { default({ notification }) { return notification.alert_type; } },
    model: { default({ notification }) { return notification.model ?? {}; } },
    receiver: { default({ notification }) { return notification.receiver ?? {}; } }
  });

  const appStore = useAppStore();
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const seenAll = computed(() => notificationStore.getSeenAll);
  const authUser = computed(() => authStore.getUser);

  const router = useRouter();
  const company = computed(() => appStore.getCompany);
  const alertItemRef = ref(null);
  const isLoading = ref(false);
  const isSeenProcessing = ref(false);
  const defaultAttributes = reactive({
    company_name: null,
    model: {},
    user: {},
  });

  function assignAttributes(attributes = {}) {
    Object.assign(defaultAttributes, { ...defaultAttributes, ...attributes });
  }

  watch(() => props.model, (newModel) => {
    if (newModel) {
      assignAttributes({ model: { ...newModel } });
    }
  }, { immediate: true });

  onMounted(() => {
    if (company.value && company.value.company_name)
      assignAttributes({ company_name: company.value.company_name });
  });

  const handleSeenNotification = async ({ stop }) => {
    await useApiRequest({
      url: `/notifications/${props.notification.notification_id}/seen`,
    }).then(res => {
      setTimeout(() => {
        stop();
        Object.assign(props.receiver, { ...props.receiver, seen_at: new Date() });
        notificationStore.setTotalUnseen(null, true);
      }, 5000);
    }).catch(error => { });
  };

  const handleMarkNotification = async () => {
    isLoading.value = true;
    await useApiRequest({
      url: `/notifications/${props.notification.notification_id}/mark`,
    }).then(res => {
      Object.assign(props.notification, { ...props.notification, highlight: !props.notification?.highlight });
    }).catch(() => { }).finally(() => { isLoading.value = false; });
  };

  const handleHideNotification = async () => {
    isLoading.value = true;
    await useApiRequest({
      url: `/notifications/${props.notification.notification_id}/hide`,
    }).then(res => {
      Object.assign(props.receiver, { ...props.receiver, hide_at: new Date() });
    }).catch(() => { }).finally(() => { isLoading.value = false; });
  };

  const handleNotificationSeen = useDebounceFn(
    handleSeenNotification,
    2000
  );

  const { stop } = useIntersectionObserver(
    alertItemRef,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && !isSeenProcessing.value && !props.receiver?.seen_at) {
        isSeenProcessing.value = true;
        handleSeenNotification({ stop });
      }
    }, {
    rootMargin: "0px 0px -180px 0px",
  });

  function redireectRoute(name, params = {}, querys = {}) {
    try {
      router.push({ name, params, querys });
    } catch (error) { return ''; }
  }

  function userNameFormat(user) {
    if (user && user.user_id === authUser.value?.user_id) return 'You ';
    if (user && user.name) return user.name;
    return 'Unknown name';
  }

  function notificationIconFormat(user) {
    if (user && user.profile_avatar) return user.profile_avatar;
  }

  const NotificationMessage = defineComponent({
    template: `${props.notification.message}`,
    setup() {
      return defaultAttributes;
    }
  });

</script>

<template>
  <div v-if="!receiver.hide_at"
    @click="redireectRoute(notification.route_name, notification.route_params, notification.route_querys)"
    class="d-block cursor-pointer">
    <div ref="alertItemRef"
      :class="{ 'is-not-seen':(!notification.highlight && !receiver?.seen_at && !seenAll), 'alert-warning':(notification.highlight) }"
      class="alert-item px-3 py-2 d-flex justify-context-start">
      <div class="alert-icon">
        <img :src="notificationIconFormat(notification.user)" />
      </div>
      <div class="alert-details ms-3">
        <div class="alert-title fs-14px text-head">
          <strong class="me-1">{{ userNameFormat(notification.user) }},</strong>
          <span class="me-1">
            <notification-message></notification-message>
          </span>
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
      <div @click.stop=""
        class="dot-menu">
        <div class="dropdown ms-2 position-relative">
          <button
            class="toolbar-btn dropdown-toggler me-n1 btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center"
            data-mdb-toggle="dropdown">
            <svg-custom-icon v-if="isLoading"
              icon="spinner-icon" />
            <font-awesome-icon v-else
              icon="fas fa-ellipsis-vertical"
              class="text-soft fs-16px"></font-awesome-icon>
          </button>
          <div class="dropdown-menu custom-dropdown-menu dropdown-menu-end me-n3">
            <div @click="handleMarkNotification"
              class="dropdown-item cursor-pointer fw-bold">
              <span class="icon">
                <font-awesome-icon icon="fas fa-check"
                  class="text-head fs-16px"></font-awesome-icon>
              </span>
              Make as {{ notification.highlight?'unmark':'mark' }}
            </div>
            <div @click="handleHideNotification"
              class="dropdown-item cursor-pointer fw-bold">
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
  </div>
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