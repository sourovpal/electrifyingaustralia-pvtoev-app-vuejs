<script setup>
  import NotificationHeader from "./NotificationHeader.vue";
  import NotificationBody from "./NotificationBody.vue";
  import { onClickOutside } from '@vueuse/core';
  import { ref, computed, onMounted } from 'vue';
  import { useNotification } from '@stores';
  const notificationRef = ref(null);
  const emits = defineEmits(['clickOutside'])
  const notify = useNotification();

  onClickOutside(notificationRef, () => {
    emits('clickOutside', true);
  });

  onMounted(() => { notify.callFetchNotifications() });

</script>

<template>
  <section ref="notificationRef"
    class="notification">
    <notification-header></notification-header>
    <notification-body></notification-body>
  </section>
</template>

<style lang="scss"
  scoped>
  .notification {
    position: fixed;
    left: 4.1rem;
    width: 22rem;
    bottom: 6rem;
    background: #ffffff;
    border-radius: 8px;
    height: fit-content;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
    z-index: 999;
  }
</style>