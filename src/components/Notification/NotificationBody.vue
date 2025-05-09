<script setup>
  import CustomScrollbar from "custom-vue-scrollbar";
  import NotificationItem from "./NotificationItem.vue";
  import NotificationSkeletor from "./NotificationSkeletor.vue";
  import { ref, computed, onMounted } from "vue";
  import { useNotificationStore } from "@stores";
  import { useIntersectionObserver } from "@vueuse/core";

  const notificationStore = useNotificationStore();
  const notifications = computed(() => notificationStore.getNotifications);
  const isLoading = computed(() => notificationStore.getIsLoading);
  const hideAll = computed(() => notificationStore.getHideAll);
  const infiniteLoadRef = ref(null);
  const isComplete = computed(() => notificationStore.getIsComplete);

  const { stop: observeStop } = useIntersectionObserver(
    infiniteLoadRef,
    ([{ isIntersecting }], observerElement) => {
      if (isComplete.value) return observeStop();
      if (isIntersecting && !isLoading.value) {
        notificationStore.callFetchNotifications();
      }
    }, { rootMargin: "0px 0px 500px 0px" });

</script>

<template>
  <div class="alert-body"
    v-if="isLoading && !notifications?.length">

    <notification-skeletor v-for="(_, index) in 6"
      :key="Math.random()" />

  </div>

  <scroll-panel v-else
    :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
    class="scroll-panel">

    <div v-if="!hideAll"
      class="alert-body">

      <notification-item v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification" />

      <div ref="infiniteLoadRef"
        class="loading-notification">

        <notification-skeletor v-if="!isComplete"
          v-for="(_, index) in 2"
          :key="Math.random()" />

      </div>

      <div v-if="!isLoading"
        class="py-5"></div>

    </div>

  </scroll-panel>

</template>

<style scoped
  lang="scss">
  .scroll-panel,
  .alert-body {
    height: 100%;
    max-height: 26.67rem;
  }
</style>