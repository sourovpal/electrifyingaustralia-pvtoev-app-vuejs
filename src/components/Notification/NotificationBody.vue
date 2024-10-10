<script setup>
  import CustomScrollbar from "custom-vue-scrollbar";
  import NotificationItem from "./NotificationItem.vue";
  import NotificationSkeletor from "./NotificationSkeletor.vue";
  import { ref, computed, onMounted } from "vue";
  import { useNotification } from '@stores';

  const notify = useNotification();
  const notifications = computed(() => notify.getNotifications);
  const isLoading = computed(() => notify.getIsLoading); 

</script>

<template>
  <div class="alert-body"
    v-if="isLoading">
    <notification-skeletor v-for="(_, index) in 5"
      :key="index * 100"></notification-skeletor>
  </div>
  <custom-scrollbar v-else
    thumbWidth="5"
    direction="vertical"
    :wrapper-style="{ height: '26.67rem' }"
    :style="{ height: '26.67rem' }"
    content-class="d-block">
    <div class="alert-body">
      <notification-item v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"></notification-item>
    </div>
  </custom-scrollbar>
</template>
<style scoped
  lang="scss">
  .alert-body {
    max-height: 26.67rem;
  }
</style>