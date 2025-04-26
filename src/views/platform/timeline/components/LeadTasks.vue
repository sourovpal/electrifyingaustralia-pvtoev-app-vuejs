<script setup>
  import { ref, computed, onMounted, nextTick } from "vue";
  import SlideUpDown from "vue-slide-up-down";
  import Task from "./Task.vue";
  import { VueDraggableNext } from "vue-draggable-next";
  import { usePlatformStore } from "@stores";
  import { useRoute } from "vue-router";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import WorkflowModal from "../modals/WorkflowModal.vue";

  const platformStore = usePlatformStore();
  const router = useRoute();

  const toggleworkflowModal = ref(false);
  const toggleDropdownBox = ref(true);
  const isCreateNew = ref(false);

  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadTasks = computed(() => platformStore.getLeadTasks);

  async function handleTaskPositionUpdate() {

    $toast.clear();

    var $tasks = leadTasks.value?.map((obj) => obj.task_id);

    await useApiRequest({
      url: `/platform/tasks/${editLeadId.value}/position`,
      method: "PUT",
      payload: {
        tasks: $tasks,
      },
    })
      .then((res) => {
        const { success, message } = res;

        if (!success)
          $toast.error(message.text);

      }).catch((error) => {
        $toast.clear();
        $toast.error(error.message.text);
      });
  }

  onMounted(() => {
    console.log('onMounted')
  })

</script>

<template>

  <div class="">

    <vue-draggable-next tag="div"
      :list="leadTasks"
      @change="handleTaskPositionUpdate"
      handle=".task-item">

      <Task v-for="(task, index) in leadTasks"
        :key="Math.random()"
        :task="task"></Task>

    </vue-draggable-next>

    <Task v-if="isCreateNew"
      :is-new="isCreateNew"
      :task="{}"
      :key="Math.random()"
      @toggle-new-task="(_status) => (isCreateNew = _status)"></Task>

    <div v-else
      class="ms-n2">

      <button @click="isCreateNew = !isCreateNew"
        class="task-action-btn add-new">

        <font-awesome-icon icon="fas fa-plus"
          class="crm-text fs-16px btn-icon"></font-awesome-icon>
        <span class="ms-2 fw-bold crm-text fs-14px">New task</span>

        <div @click.stop="toggleworkflowModal = true"
          class="px-2 ms-auto">
          <i class="pi pi-sitemap crm-text fs-16px btn-icon"></i>
        </div>

      </button>

    </div>

  </div>

  <workflow-modal v-if="toggleworkflowModal"
    :visible="toggleworkflowModal"
    @close="() => (toggleworkflowModal = false)"></workflow-modal>

</template>

<style lang="scss"
  scoped>
  .task-action-btn {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 4px 6px 4px 12px;
    width: 100%;
    text-align: left;
    transition: all 0.3s ease-in-out;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 3px;

    &:hover {
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }
  }
</style>