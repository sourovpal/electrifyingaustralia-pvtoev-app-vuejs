<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useApiRequest } from "@actions";
  import CustomScrollbar from "custom-vue-scrollbar";
  import { Skeletor } from "vue-skeletor";
  import { handleDateTimeFormat, formatTimeAgo } from "@helpers";
  import { $toast } from "@config";

  const sessions = ref([]);
  const isLoading = ref(false);
  let interval_id = null;

  const fetchActiveSessions = async () => {

    const res = await useApiRequest({
      url: '/settings/account/sessions',
    }).then(_sessions => {

      sessions.value = _sessions;

    }).catch(error => {

      $toast.error(error.message.text);

    }).finally(() => {

      isLoading.value = false;

    });
  };

  const logoutOthersDevice = async (token_id) => {

    await useApiRequest({
      url: `/settings/account/logout?token_id=${token_id}`,
      method: 'post'
    }).then(res => {

      if (!res.success) {
        return $toast.error(res.message.text);
      }

      fetchActiveSessions();

    }).catch(error => {

      $toast.error(error.message.text);

    });

  };

  // Lifecycle hooks
  onMounted(() => {
    isLoading.value = true;
    fetchActiveSessions();
    interval_id = setInterval(() => {
      fetchActiveSessions();
    }, 10000);
  });

  onBeforeUnmount(() => {
    clearInterval(interval_id);
  });
</script>




<template>
  <div class="row">
    <div class="col-lg-2 col-12 mb-3 mb-lg-0">
      <div class="settings-group-header">
        <h2>Active sessions</h2>
      </div>
    </div>
    <div class="col-lg-9 col-12"
      id="action-session">
      <CustomScrollbar thumbWidth="5">
        <table class="table table-borderless table-sm table-striped- mb-0 table-hover table-light">
          <thead>
            <tr class="border-bottom">
              <th class="fw-bold py-1"
                width="25%"
                scope="col">Browser</th>
              <th class="fw-bold py-1 d-none d-lg-table-cell"
                width="20%"
                scope="col">
                Location
              </th>
              <th class="fw-bold py-1 d-none d-lg-table-cell"
                width="15%"
                scope="col">
                IP
              </th>
              <th class="fw-bold py-1 d-none d-lg-table-cell"
                width="15%"
                scope="col">
                Sign In
              </th>
              <th class="fw-bold py-1 d-none d-lg-table-cell"
                width="15%"
                scope="col">
                Last seen
              </th>
              <th class="fw-bold py-1"
                width="5%"
                scope="col">User</th>
              <th class="fw-bold py-1"
                width="5%"
                scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!isLoading"
              v-for="(session, index) in sessions"
              :key="index">
              <td scope="col"
                class="py-1">{{ session.browser }}</td>
              <td scope="col"
                class="py-1 d-none d-lg-table-cell">
                {{ session.location }}
              </td>
              <td scope="col"
                class="py-1 d-none d-lg-table-cell">
                {{ session.ip_address }}
              </td>
              <td scope="col"
                class="py-1 d-none d-lg-table-cell">
                {{ handleDateTimeFormat(session.created_at) }}
              </td>
              <td scope="col"
                class="py-1 d-none d-lg-table-cell">
                {{ formatTimeAgo(session.updated_at)?.replace('a few seconds ago', 'just now') }}
              </td>
              <td scope="col"
                class="py-1">
                <span :class="`btn btn-sm py-0 px-1 fs-12px btn-${
                    session.is_active == 1 ? 'danger' : 'warning'
                  }`">{{ session.is_active == 1 ? "Current" : "Other" }}</span>
              </td>
              <td scope="col"
                class="py-1 text-center">
                <button :disabled="session.is_active"
                  @click="logoutOthersDevice(session.id)"
                  class="btn btn-sm btn-danger py-0 px-1"
                  v-tippy="{ content: 'Sign Out', placement: 'top' }">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 24 24"
                    height="14px"
                    viewBox="0 0 24 24"
                    width="14px"
                    fill="#ffffff">
                    <path d="M0,0h24v24H0V0z"
                      fill="none"></path>
                    <path
                      d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z">
                    </path>
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-for="(item, index) in 2"
              v-else>
              <td v-for="(item, index) in 7"
                :key="index">
                <Skeletor style="width: 100%; height: 20px; border-radius: 3px" />
              </td>
            </tr>
          </tbody>
        </table>
      </CustomScrollbar>
    </div>
  </div>
</template>
<style scoped
  lang="scss">
  #action-session {
    padding: 6px;
    border-radius: 5px;
    background: #ffffff;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
      rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;

    table {
      tr {

        td,
        th {
          white-space: nowrap;
          background-color: #ffffff !important;
        }
      }
    }
  }
</style>
<style>
  #action-session .scrollbar__wrapper {
    height: fit-content !important;
  }
</style>