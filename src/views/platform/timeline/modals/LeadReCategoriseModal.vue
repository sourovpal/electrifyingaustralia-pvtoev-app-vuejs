<script setup>
  import { Modal } from "mdb-ui-kit";
  import { ConfirmQualify, MoveLeadStatusToPipeline } from "@actions/LeadAction";
  import { useLeadStore } from "@stores";
  import { useAppStore } from "@stores";
  import SelectObjectId from "./fields/SelectObjectId.vue";
  import { ref, onMounted, watch, computed, defineExpose } from 'vue';
  import { $toast } from '@config';
  import { useApiRequest } from '@actions/api';

  const leadStore = useLeadStore();
  const appStore = useAppStore();
  const isPipelineLead = computed(() => leadStore.getIsPipelineLead);
  const errors = ref({});
  const leadStatus = ref([]);
  const leadQualifyModalRef = ref(null);
  const modalInstance = ref(null);

  const pipelineIsLoading = ref(false);
  const statusesIsLoading = ref(false);
  const stagesIsLoading = ref(false);

  const selectedStatus = ref(null);
  const selectedPipeline = ref(null);
  const selectedStage = ref(null);
  const isSubmitMovePipelineOrStatus = ref(false);

  onMounted(() => {
    modalInstance.value = new Modal(leadQualifyModalRef.value);
  });

  const pipelines = computed(() => leadStore.getPipelines);
  const statuses = computed(() => leadStore.getStatuses);
  const pipelineStages = ref([]);

  function showModalHandler() {
    $toast.clear();
    if (!pipelines.value.length) {
      leadStore.callFetchPipeline(function ({ loading, pipelines }) {
        pipelineIsLoading.value = loading;
      });
    }

    if (!statuses.value.length) {
      leadStore.callFetchStatuses(function ({ loading }) {
        statusesIsLoading.value = loading;
      });
    }
    errors.value = {};
    selectedStatus.value = null;
    selectedPipeline.value = null;
    selectedStage.value = null;
    pipelineStages.value = [];
    modalInstance.value.show();
  }

  function hideModalHandler() {
    modalInstance.value.hide();
  }

  async function selectPipelineHandler(pipelineOption) {
    $toast.clear();
    errors.value = {};
    selectedStatus.value = null;
    selectedStage.value = null;
    selectedPipeline.value = pipelineOption;
    leadStore.callFetchPipelineStages(pipelineOption.pipeline_id, function ({ loading, stages, message }) {
      stagesIsLoading.value = loading;
      if (!loading && stages) {
        pipelineStages.value = stages;
        if (!stages.length) {
          errors.value = { 'pipeline_stage': ['Pipeline stage not found.'] }
        }
      } else if (message) {
        $toast.error(message.text);
      }
    });
  }

  function selectPipelineStageHandler(selectedOption) {
    $toast.clear();
    errors.value = {};
    selectedStatus.value = null;
    selectedStage.value = selectedOption;
  }

  function selectStatusHandler(selectedOption) {
    $toast.clear();
    errors.value = {};
    selectedPipeline.value = null;
    selectedStage.value = null;
    selectedStatus.value = selectedOption;
  }

  async function leadMovePipelineOrStatus() {
    $toast.clear();
    errors.value = {};
    var leadId = leadStore.getEditLeadId;
    isSubmitMovePipelineOrStatus.value = true;
    var data = {
      lead: leadId,
      status: selectedStatus.value?.status_id ?? null,
      pipeline: selectedPipeline.value?.pipeline_id ?? null,
      pipeline_stage: selectedStage.value?.stage_id ?? null,
    };

    await useApiRequest({
      url: '/leads/move-lead',
      method: 'post',
      payload: data,
    }).then(res => {
      const { success, message, ...args } = res;
      isSubmitMovePipelineOrStatus.value = false;
      if (!success && args.errors) {
        errors.value = args.errors;
        return;
      }
      this.leadStore.callFetchTimelineLogs();
      if (data.status) {
        leadStore.setLeadStatus(selectedStatus.value);
        leadStore.setLeadPipeline({});
        leadStore.setLeadStage({});
        leadStore.setIsPipelineLead(false);
        leadStore.callFetchProperties(leadStore.getEditLeadId);
      } else {
        leadStore.setLeadStatus({});
        leadStore.setLeadPipeline(selectedPipeline.value);
        leadStore.setLeadStage(selectedStage.value);
        leadStore.callFetchLeadStages(leadStore.getEditLeadId);
        leadStore.callFetchProperties(leadStore.getEditLeadId);
        leadStore.setIsPipelineLead(true);
      }
      isSubmitMovePipelineOrStatus.value = false;
      selectedStatus.value = null;
      selectedPipeline.value = null;
      selectedStage.value = null;
      $toast[message.type](message.text);
      hideModalHandler();
    }).catch(error => {
      $toast.error("Oops, something went wrong");
    });
    isSubmitMovePipelineOrStatus.value = false;
  }

  defineExpose({
    showModalHandler,
    hideModalHandler
  });

</script>

<template>
  <div class="modal fade"
    ref="leadQualifyModalRef">
    <div class="modal-dialog modal-dialog-centered- modal-md mx-auto"
      style="max-width: 420px">
      <div class="modal-content">
        <div class="modal-header py-2">
          <div class="d-flex justify-content-center align-items-center py-0">
            <svg class="svg-5 me-2"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24">
              <path
                d="M480-40q-186 0-313-69.5T40-280q0-69 64-126.5T280-494v82q-73 23-116.5 59T120-280q0 64 108 112t252 48q144 0 252-48t108-112q0-37-43.5-73T680-412v-82q112 30 176 87.5T920-280q0 101-127 170.5T480-40ZM360-200v-440H160v-80h640v80H600v440h-80v-200h-80v200h-80Zm120-560q-33 0-56.5-23.5T400-840q0-33 23.5-56.5T480-920q33 0 56.5 23.5T560-840q0 33-23.5 56.5T480-760Z" />
            </svg>
            <span class="text-hard fw-bold fs-16px">Move lead</span>
          </div>
          <div>
            <button class="btn btn-light btn-sm btn-floating d-lg-none"
              @click="hideModalHandler()">
              <svg class="svg-5"
                xmlns="http://www.w3.org/2000/svg"
                height="22"
                viewBox="0 -960 960 960"
                width="22">
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <p class="fs-16px mb-4 text-center">
            This operation will not count as a <strong>conversion</strong>. Use
            this functionality only to fix mistakes or recategorise leads in a
            way that should not count towards your team's reporting goals.
          </p>
          <div class="mb-4 position-relative">
            <label class="form-label-title"
              for="">Move
              {{ isPipelineLead ? "back to lead status"
              : "to another lead status"
              }}</label>
            <select-object-id :loading="statusesIsLoading"
              :options="statuses"
              :selected="selectedStatus"
              @change="selectStatusHandler"
              @click="delete errors?.status"
              label="name" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
          </div>

          <div class="mb-2 position-relative">
            <label class="form-label-title"
              for="">Move from
              {{
              isPipelineLead
              ? "another pipeline stage"
              : "lead to pipeline stage"
              }}</label>
            <select-object-id :loading="pipelineIsLoading"
              :options="pipelines"
              :selected="selectedPipeline"
              @change="selectPipelineHandler"
              @click="delete errors?.pipeline"
              label="title" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.pipeline?.length">{{ errors?.pipeline[0] }}</span>
          </div>
          <!-- Pipeline Stage Input -->
          <div class="mb-4 position-relative">
            <select-object-id :disabled="!pipelineStages.length"
              :loading="stagesIsLoading"
              :options="pipelineStages"
              :selected="selectedStage"
              @change="selectPipelineStageHandler"
              @click="delete errors?.pipeline_stage"
              label="name" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.pipeline_stage?.length">{{ errors?.pipeline_stage[0] }}</span>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <button @click="hideModalHandler()"
              class="btn btn-danger">
              Close
            </button>
            <loading-button :disabled="!((selectedPipeline && selectedStage) || selectedStatus)"
              :is-loading="isSubmitMovePipelineOrStatus"
              @submit="leadMovePipelineOrStatus()">Confirm Move</loading-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>