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
    alert_icon: { default({ notification }) { return notification.alert_icon || null; } },
    model: { default({ notification }) { return notification.model ?? {}; } },
    receiver: { default({ notification }) { return notification.receiver ?? {}; } },
    actions: { default({ notification }) { return notification.actions ?? null; } },
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

  function redireectRoute(name, params = {}, query = {}) {
    try {

      let routeName = props.notification.route_name;
      let $url = null;
      let $route = { name, params, query };
      let model = props.model;

      if (props.alert_type === 'deleted')
        return '';

      if (routeName === 'timeline-leads-edit' && model.is_pipeline) { // lead redirect url generate

        $route['name'] = 'timeline-deals-edit';

      } else if (routeName === 'platform-tasks') { // Lead Task url generate

        if (model.completed_at) {

          $route['query'] = { ...query, stage: 'complete' }

        } else if (model.duration) {

          $route['query'] = { ...query, stage: 'in-complete' }

        } else {

          $route['query'] = { ...query, stage: 'unscheduled' }

        }

      }

      $url = router.resolve($route).href;
      console.log($url)
      return $url ?? '';

    } catch (error) {
      console.log(error)
      return '';
    }
  }

  function userNameFormat(user) {
    if (user && user.user_id === authUser.value?.user_id) return 'You ';
    if (user && user.name) return user.name;
    return 'Unknown name';
  }

  const NotificationMessage = defineComponent({
    template: `${props.notification.message}`,
    setup() {
      return defaultAttributes;
    }
  });

</script>

<template>
  <router-link v-if="!receiver.hide_at"
    :to="redireectRoute(notification.route_name, notification.route_params, notification.route_querys)"
    class="d-block cursor-pointer">

    <div ref="alertItemRef"
      :class="{ 
      'is-not-seen':(!notification.highlight && !receiver?.seen_at && !seenAll), 
      'alert-warning':(notification.highlight && alert_type == 'normal'), 
      'alert-danger':(notification.highlight && alert_type === 'deleted')}"
      class="alert-item px-3 py-2 d-flex justify-context-start">

      <!-- Alert Icon Start -->
      <div v-if="notification.user"
        class="alert-icon d-flex justify-content-center align-items-center">
        <img :src="notification.user?.profile_avatar" />
      </div>

      <div v-else
        class="alert-icon d-flex justify-content-center align-items-center"
        :class="`alert-${alert_type}`">
        <font-awesome-icon :icon="alert_icon||'fas fa-bell'"
          :class="`text-${alert_type} fs-25px`"></font-awesome-icon>
      </div>
      <!-- Alert Icon End -->

      <div class="alert-details ms-3">

        <div class="alert-title fs-14px text-head">

          <strong class="me-1">{{ userNameFormat(notification.user) }}</strong>

          <span class="me-1">
            <notification-message></notification-message>
          </span>

        </div>

        <div class="created-at text-soft fs-12px py-1 d-flex justify-content-between align-items-center">
          <span>
            {{ formatTimeAgo(notification.created_at)?.replace("a few seconds ago", "just now")}}</span>
        </div>

        <!-- Action Button -->
        <div v-if="actions"
          class="d-flex justify-content-between align-items-center"
          :class="actions?.wrapper?.class"
          :style="actions?.wrapper?.style">
          <button class="btn btn-danger btn-sm py-1">Cancel</button>
          <button class="btn btn-primary btn-sm py-1">Confirm</button>
        </div>

      </div>
      <div class="dot-menu">

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
            <div @click.prevent="handleMarkNotification"
              class="dropdown-item cursor-pointer fw-bold">
              <span class="icon">
                <font-awesome-icon icon="fas fa-check"
                  class="text-head fs-16px"></font-awesome-icon>
              </span>
              Make as {{ notification.highlight?'unmark':'mark' }}
            </div>

            <div @click.prevent="handleHideNotification"
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
      /* opacity: 0; */
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