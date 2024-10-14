<script setup>
import { Modal } from "mdb-ui-kit";
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { usePlatformStore } from "@stores";
import { $toast } from "@config";
import { useApiRequest } from "@actions";
import WorkflowTasks from "./sections/WorkflowTasks.vue";

const platformStore = usePlatformStore();
const workflowModalRef = ref(null);
const taskWorkflows = ref([]);
const isLoading = ref(false);

onMounted(() => {
  $toast.clear();
  isLoading.value = true;
  useApiRequest({
    url: `/platform/${platformStore.getEditLeadId}/workflows`,
  })
    .then(async (res) => {
      const { success, workflows, message } = res;
      if (success) {
        nextTick(() => {
          taskWorkflows.value = workflows;
        });
        return;
      }
      $toast.error(message.text);
    })
    .catch((error) => {
      $toast.error("Oops, something went wrong");
    })
    .finally(() => {
      isLoading.value = false;
    });
});

function hideModalHandler() {
  workflowModalRef.value.hide();
}

defineExpose({
  hideModalHandler,
});
</script>

<template>
  <bootstrap-modal
    v-bind="$attrs"
    ref="workflowModalRef"
    :dialog-style="{'max-width':'450px'}"
  >
    <template #header>
      <div class="modal-header py-2">
        <div class="d-flex justify-content-center align-items-center py-0">
          <font-awesome-icon
            icon="fas fa-list-check"
            class="text-head fs-16px me-2"
          ></font-awesome-icon>
          <span class="text-head fw-bold fs-16px">Choose workflow</span>
        </div>
        <div>
          <button
            class="btn btn-light btn-sm btn-floating"
            data-mdb-dismiss="modal"
          >
            <font-awesome-icon
              icon="fas fa-close"
              class="text-soft fs-14px"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
    </template>
    <div
      class="d-flex justify-content-center align-items-center"
      v-if="isLoading"
    >
      <svg-custom-icon icon="SpinnerIcon" /> Loading...
    </div>
    <workflow-tasks
      v-else
      v-for="(workflow, index) in taskWorkflows"
      :key="index"
      :workflow="workflow"
    ></workflow-tasks>
  </bootstrap-modal>
</template>
<style scoped>
.modal-body {
  max-height: 650px;
  overflow: auto;
}
</style>