<script setup>
import NotificationHeader from "./NotificationHeader.vue";
import NotificationBody from "./NotificationBody.vue";
</script>

<template>
  <section class="notification">
    <notification-header></notification-header>
    <notification-body></notification-body>
  </section>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  left: 4.1rem;
  width: 22rem;
  bottom: 6rem;
  height: 30rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  z-index: 999;
}
</style>