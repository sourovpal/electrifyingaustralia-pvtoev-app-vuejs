<script setup>
  import { ref } from 'vue';
  import { useApiRequest } from '@actions';
  import { useNotificationStore } from '@stores';

  const notificationStore = useNotificationStore();
  const isLoading = ref(false);

  const handleSeenNotification = async () => {
    if (!notificationStore.getUnseen) return;
    isLoading.value = true;
    await useApiRequest({
      url: `/notifications/all/seen`,
    }).then(res => {
      notificationStore.setSeenAll();
    }).catch(error => { })
      .finally(() => isLoading.value = false);
  };

  const handleHideNotification = async () => {
    if (!notificationStore.getNotifications?.length) return;
    isLoading.value = true;
    await useApiRequest({
      url: `/notifications/all/hide`,
    }).then(res => {
      notificationStore.setHideAll();
    }).catch(error => { })
      .finally(() => isLoading.value = false);
  };

</script>
<template>
  <div class="header px-3 d-flex justify-content-between align-items-center flex-col border-bottom">
    <div class="col-left">
      <h4 class="mb-0 fs-20px fw-bold text-soft d-flex justify-content-between align-items-center">
        Notifications
        <!-- <span class="notification-badge bg-danger ms-3">9+</span> -->
      </h4>
    </div>
    <div class="col-right">
      <div class="dropdown">
        <button
          class="toolbar-btn me-n1 btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center"
          data-mdb-toggle="dropdown">
          <svg-custom-icon v-if="isLoading"
            icon="spinner-icon" />
          <font-awesome-icon v-else
            icon="fas fa-ellipsis-vertical"
            class="text-soft fs-16px"></font-awesome-icon>
        </button>
        <div class="dropdown-menu custom-dropdown-menu dropdown-menu-end me-n3">
          <div @click="handleSeenNotification"
            class="dropdown-item cursor-pointer fw-bold">
            <span class="icon">
              <font-awesome-icon icon="fas fa-check"
                class="text-head fs-16px"></font-awesome-icon>
            </span>
            Make all read
          </div>
          <div @click="handleHideNotification"
            class="dropdown-item cursor-pointer fw-bold">
            <span class="icon">
              <font-awesome-icon icon="fas fa-trash"
                class="text-head fs-14px"></font-awesome-icon>
            </span>
            Clear all
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"
  scoped>
  .header {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;

    .custom-dropdown-menu {
      .dropdown-item {
        .icon {
          width: 1.5rem;
          display: inline-block;
        }
      }
    }

    .notification-badge {
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

    .toolbar-btn {
      border-radius: 50% !important;
      background: transparent !important;
    }
  }
</style>