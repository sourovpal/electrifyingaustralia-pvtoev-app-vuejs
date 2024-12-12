<script setup>
  import { Modal } from "mdb-ui-kit";
  import { ref, onMounted, watch, computed, nextTick } from "vue";
  import { usePlatformStore } from "@stores";
  import { $toast } from "@config";
  import WorkflowTasks from "../components/WorkflowTasks.vue";
  import { Skeletor } from "vue-skeletor";

  const emits = defineEmits(['close']);

  const platformStore = usePlatformStore();
  const workflowModalRef = ref(null);
  const taskWorkflows = computed(() => platformStore.getWorkflows);
  const isLoading = ref(false);

  onMounted(() => {
    $toast.clear();
    isLoading.value = true;
    platformStore.callFetchWorkflows(platformStore.getEditLeadId, ({ loading }) => {
      isLoading.value = loading;
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
  <modal-dialog modal
    v-bind="$attrs"
    pt:root:class="rounded-2 px-3 pt-0 pb-2"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '18vw' }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">

    <template #container>

      <div class="py-2 d-flex justify-content-between align-items-center">

        <div class="d-flex justify-content-center align-items-center py-0">

          <i class="pi pi-sitemap text-head fs-16px me-2"></i>

          <span class="text-head fw-bold fs-16px">Choose workflow</span>

        </div>

        <div>

          <button @click="emits('close', true)"
            class="btn btn-light btn-sm btn-floating">
            <i class="text-soft fs-14px pi pi-times"></i>
          </button>

        </div>

      </div>


      <template v-if="isLoading">
        <div v-for="(_, index) in 3"
          :key="index*Math.random()"
          class="border mb-2 py-2 px-2 ">
  
          <Skeletor style="width:1.3rem;height:1.3rem;border-radius:3px;"
            class="me-2"></Skeletor>
  
          <Skeletor style="width:80%;height:1rem;border-radius:3px;"></Skeletor>
  
        </div>
      </template>

      <template v-else>
        
        <workflow-tasks v-for="(workflow, index) in taskWorkflows"
          :key="index"
          :workflow="workflow"></workflow-tasks>

      </template>
    </template>


  </modal-dialog>

</template>

<style scoped>
  .modal-body {
    max-height: 650px;
    overflow: auto;
  }
</style>