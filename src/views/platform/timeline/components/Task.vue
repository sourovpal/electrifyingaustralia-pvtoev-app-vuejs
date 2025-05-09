<script setup>
  import { AvatarIcon } from "@assets/icons";
  import { ref, onMounted, computed, watch, nextTick, useAttrs } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { usePlatformStore } from "@stores";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";
  import moment from "moment";
  import TeamMembersPopover from "../../components/dropdowns/TeamMembersPopover.vue";
  import { useConfirm } from "primevue/useconfirm";

  const confirm = useConfirm();
  const attrs = useAttrs();
  const platformStore = usePlatformStore();

  const props = defineProps({
    task: { type: Object, default: {} },
    isNew: { type: Boolean, default: false },
  });

  const emits = defineEmits(["toggleNewTask"]);
  const teamMembersPopovarRef = ref(null);
  const isEdit = ref(false);
  const taskItemRef = ref(null);
  const isUserLoading = ref(false);
  const isLoading = ref(false);
  const users = computed(() => platformStore.getUsers);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadTask = ref({});
  const toggleTaskDelete = ref(false);
  const tempTitle = ref(null);
  const tempDuration = ref(null);


  const confirmDeleteTask = (event) => {
    confirm.require({
      target: event.currentTarget,
      header: 'Delete Task?',
      message: 'Are you sure you want to Delete?',
      icon: 'pi pi-trash fs-16px',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
        style: 'height:2rem'
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger',
        style: 'height:2rem'
      },
      accept: () => handleDeleteTask(),
      reject: () => { }
    });
  };


  async function handleUpdateOrCreateTask() {
    $toast.clear();

    if (!leadTask.value.title) return;

    if (!props.isNew) {
      return handleUpdateTask();
    }

    isLoading.value = true;

    if (tempDuration.value) {
      tempDuration.value = moment(tempDuration.value).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    await useApiRequest({
      url: `/platform/tasks/${editLeadId.value}/create`,
      method: "post",
      payload: {
        title: leadTask.value.title,
        owner_id: leadTask.value.owner?.user_id,
        duration: tempDuration.value,
        is_complete: leadTask.value.is_complete,
      },
    })
      .then((res) => {
        const { success, message } = res;

        if (success) {
          platformStore.callFetchTimelineLogs();

          platformStore.callFetchLeadTasks(
            editLeadId.value,
            function ({ loading }) {
              if (!loading) {
                emits("toggleNewTask", false);
              }
            }
          );
        } else {
          $toast.error(message.text);
        }
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message.text);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  async function handleUpdateTaskStage() {
    $toast.clear();
    leadTask.value.is_complete = !leadTask.value.is_complete;

    if (props.isNew) return;

    isLoading.value = true;

    await useApiRequest({
      url: `/platform/tasks/${editLeadId.value}/${leadTask.value.task_id}/stage`,
      method: "PUT",
      payload: {
        is_complete: leadTask.value.is_complete,
      },
    })
      .then((res) => {
        const { success, message } = res;
        if (!success) {
          return $toast.error(message.text);
        }
        platformStore.callFetchTimelineLogs();
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message.text);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  async function handleUpdateTask() {
    if (tempDuration.value) {
      tempDuration.value = moment(tempDuration.value).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    if (
      props.isNew ||
      (tempTitle.value === leadTask.value.title &&
        tempDuration.value === leadTask.value.duration)
    ) {
      return;
    }

    isLoading.value = true;

    await useApiRequest({
      url: `/platform/tasks/${editLeadId.value}/${leadTask.value.task_id}/update`,
      method: "PUT",
      payload: {
        title: leadTask.value.title,
        duration: tempDuration.value,
      },
    })
      .then((res) => {
        const { success, message, task } = res;

        if (success) {
          platformStore.callFetchTimelineLogs();

          tempTitle.value = task.title;

          leadTask.value["duration"] = task.duration;

          isEdit.value = false;

          return;
        }
        $toast.error(message.text);
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message.text);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  async function handleUpdateOwner(owner = {}) {
    $toast.clear();
    if (props.isNew) {
      leadTask.value["owner"] = { ...owner };
      return;
    }
    isLoading.value = true;
    await useApiRequest({
      url: `/platform/tasks/${editLeadId.value}/${leadTask.value.task_id}/owner`,
      method: "PUT",
      payload: {
        owner_id: owner?.user_id ?? null,
      },
    })
      .then((res) => {
        const { success, message } = res;
        if (success) {
          platformStore.callFetchTimelineLogs();
          leadTask.value["owner"] = { ...owner };
          return;
        }
        $toast.error(message.text);
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message.text);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  async function handleDeleteTask() {
    $toast.clear();
    if (props.isNew) return;
    isLoading.value = true;
    await useApiRequest({
      url: `/platform/tasks/${editLeadId.value}/${leadTask.value.task_id}/delete`,
      method: "DELETE",
    })
      .then((res) => {
        const { success, message } = res;
        if (success) {
          platformStore.callFetchTimelineLogs();

          platformStore.callFetchLeadTasks(
            editLeadId.value,
            function ({ loading }) { }
          );

          return;
        }
        $toast.error(message.text);
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message.text);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  function fetchUsers(event) {
    teamMembersPopovarRef.value.toggle(event);
    if (!users.value.length) {
      platformStore.callFetchUsers(function ({ loading }) {
        isUserLoading.value = loading;
      });
    }
  }

  onClickOutside(taskItemRef, (event) => {
    if (props.isNew) {
      if (!leadTask.value.title) {
        emits("toggleNewTask", false);
        return;
      } else {
        isEdit.value = false;
        handleUpdateOrCreateTask();
      }
    } else if (isEdit.value) {
      isEdit.value = false;
      return handleUpdateTask();
    }
  });

  onMounted(() => {
    leadTask.value = props.task;
    tempTitle.value = props.task?.title ?? null;
    tempDuration.value = props.task?.duration ?? null;
    isEdit.value = props.isNew;
  });
</script>

<template>
  <div ref="taskItemRef"
    v-bind="attrs"
    :class="{ active: isEdit }"
    class="task-item d-flex justify-content-start align-items-center ms-n2">

    <div class="marker">

      <custom-checkbox @click="handleUpdateTaskStage"
        :checked="!!leadTask.is_complete">

        <circle-spinner v-if="isLoading"
          :loading="isLoading" />

      </custom-checkbox>

    </div>

    <div class="d-flex justify-content-start align-items-center flex-grow-1 w-100">

      <div @click="isEdit = true"
        class="title fs-14px fw-bold text-head py-1 px-1 flex-grow-1">

        <span class="title-text"
          :class="{'text-decoration-line-through':!!leadTask.is_complete}"
          v-if="!isEdit">{{ leadTask.title }}</span>

        <input v-else
          @keyup.enter="handleUpdateOrCreateTask"
          class="w-100 border-0 title-edit fw-bold"
          type="text"
          v-model="leadTask['title']" />

      </div>

      <div class="action ms-auto d-flex justify-content-between align-items-center">

        <div class="stop-watch me-1">

          <VueDatePicker v-model="tempDuration"
            @closed="handleUpdateTask">

            <template #trigger>

              <button v-tippy="leadTask.duration"
                :class="{ visible: tempDuration }"
                class="toolbar-btn btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center">

                <font-awesome-icon icon="far fa-clock"
                  :class="{ 'clock-active': tempDuration }"
                  class="text-soft fs-16px"></font-awesome-icon>

              </button>

            </template>

          </VueDatePicker>

        </div>

        <div class=""
          v-tippy="leadTask.owner?.name ?? 'Change Owner'">

          <div @click="fetchUsers"
            class="owner-avatar cursor-pointer me-1">

            <img :src="leadTask.owner?.profile_avatar ?? AvatarIcon"
              alt="" />

          </div>

          <team-members-popover ref="teamMembersPopovarRef"
            :member="leadTask.owner"
            @change="handleUpdateOwner"></team-members-popover>

        </div>

        <div class="dot-menu">

          <button data-mdb-toggle="dropdown"
            class="toolbar-btn btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center">

            <font-awesome-icon icon="fas fa-ellipsis-vertical"
              class="text-soft fs-16px"></font-awesome-icon>

          </button>
          <div class="dropdown-menu dot-menu-items">

            <button @click="confirmDeleteTask"
              :disabled="isNew"
              class="dropdown-item py-1 fs-14px fw-bold text-head">
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<style scoped
  lang="scss">
  .visible {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .clock-active {
    color: rgb(20 202 123) !important;
  }

  .task-item {
    padding: 0px 6px 0px 0px;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;

    &:hover,
    &.active {
      background: #ffffff;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

      .action {
        margin-right: 0px !important;

        .dot-menu,
        .stop-watch {
          visibility: visible !important;
        }
      }
    }

    .title {
      display: grid;
      overflow: hidden;

      .title-text {
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
      }

      .title-edit {
        outline: none;
        box-shadow: none;
        border: none;
        background-color: transparent;
      }
    }

    .action {
      width: 5.5rem;
      /* margin-right: -36px; */
      transition: all 0.2s ease-in;

      .dot-menu,
      .stop-watch {
        transition: all 0.2s ease-in;
        /* visibility: hidden; */
      }
    }

    .owner-avatar {
      width: 1.3rem;
      height: 1.3rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  .dot-menu-items {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
    border-radius: 3px !important;

    &::before {
      content: "";
      position: absolute;
      top: -7px;
      right: 10px;
      border: 7px solid #dedede;
      border-right-color: white;
      border-bottom-color: white;
      transform: rotate(45deg);
      border-bottom-color: transparent;
      border-right-color: transparent;
    }

    &::after {
      content: "";
      position: absolute;
      top: -6px;
      right: 10px;
      border: 7px solid white;
      border-right-color: white;
      border-bottom-color: white;
      transform: rotate(45deg);
      border-bottom-color: transparent;
      border-right-color: transparent;
    }
  }
</style>