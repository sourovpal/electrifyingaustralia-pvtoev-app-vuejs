<script setup>
  import { usePlatformStore } from "@stores";
  import { useAppStore } from "@stores";
  import SelectObject from "../../components/fields/SelectObject.vue";
  import { ref, onMounted, watch, computed } from "vue";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const platformStore = usePlatformStore();
  const appStore = useAppStore();
  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
  const errors = ref({});
  const leadStatus = ref([]);
  const leadQualifyModalRef = ref(null);

  const pipelineIsLoading = ref(false);
  const statusesIsLoading = ref(false);
  const stagesIsLoading = ref(false);

  const selectedStatus = ref(null);
  const selectedPipeline = ref(null);
  const selectedStage = ref(null);
  const isSubmitMovePipelineOrStatus = ref(false);

  const pipelines = computed(() => platformStore.getPipelines);
  const statuses = computed(() => platformStore.getStatuses);
  const pipelineStages = computed(() => platformStore.getPipelineStages);

  function showModalHandler() {

    $toast.clear();

    if (!pipelines.value.length)
      platformStore.callFetchPipeline(function ({ loading, pipelines }) {
        pipelineIsLoading.value = loading;
      });

    if (!statuses.value.length)
      platformStore.callFetchStatuses(function ({ loading }) {
        statusesIsLoading.value = loading;
      });

    errors.value = {};
    selectedStatus.value = null;
    selectedPipeline.value = null;
    selectedStage.value = null;

    platformStore.setPipelineStages([]);

  }

  onMounted(() => {
    showModalHandler();
  });

  function hideModalHandler() {
    leadQualifyModalRef.value.hide();
  }

  async function selectPipelineHandler(pipelineOption) {

    $toast.clear();

    errors.value = {};

    selectedStatus.value = null;
    selectedStage.value = null;
    selectedPipeline.value = pipelineOption;

    platformStore.setPipelineStages([]);

    platformStore.callFetchPipelineStages(
      pipelineOption.pipeline_id,
      function ({ loading, stages }) {

        stagesIsLoading.value = loading;

        if (!loading && stages && !stages?.length) {

          errors.value = { pipeline_stage: ["Pipeline stage not found."] };
        }

      }

    );
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

    var leadId = platformStore.getEditLeadId;
    isSubmitMovePipelineOrStatus.value = true;

    var data = {
      status: selectedStatus.value?.status_id ?? null,
      pipeline: selectedPipeline.value?.pipeline_id ?? null,
      pipeline_stage: selectedStage.value?.stage_id ?? null,
    };

    await useApiRequest({
      url: `/leads/${leadId}/move-lead`,
      method: "post",
      payload: data,
    })
      .then((res) => {
        const { success, message, ...args } = res;

        isSubmitMovePipelineOrStatus.value = false;

        if (!success && args.errors) {
          errors.value = args.errors;
          return;
        }

        this.platformStore.callFetchTimelineLogs();

        if (data.status) {

          platformStore.setLeadStatus(selectedStatus.value);
          platformStore.setLeadPipeline({});
          platformStore.setLeadStage({});
          platformStore.setIsPipelineLead(false);
          platformStore.callFetchProperties(platformStore.getEditLeadId);
          router.push({ path: `/platform/leads/${leadId}` });

        } else {

          platformStore.setLeadStatus({});
          platformStore.setLeadPipeline(selectedPipeline.value);
          platformStore.setLeadStage(selectedStage.value);
          platformStore.callFetchLeadStages(platformStore.getEditLeadId);
          platformStore.callFetchProperties(platformStore.getEditLeadId);
          platformStore.setIsPipelineLead(true);
          router.push({ path: `/platform/deals/${leadId}` });

        }

        isSubmitMovePipelineOrStatus.value = false;
        selectedStatus.value = null;
        selectedPipeline.value = null;
        selectedStage.value = null;
        $toast[message.type](message.text);

        hideModalHandler();

      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message);
      });

    isSubmitMovePipelineOrStatus.value = false;
  }
</script>

<template>
  <bootstrap-modal ref="leadQualifyModalRef"
    v-bind="$attrs"
    :dialog-style="{ 'max-width': '420px' }"
    size="sm">
    <template #header>
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
            data-mdb-dismiss="modal">
            <font-awesome-icon icon="fas fa-close"></font-awesome-icon>
          </button>
        </div>
      </div>
    </template>
    <p class="fs-16px mb-4 text-center">
      This operation will not count as a <strong>conversion</strong>. Use this
      functionality only to fix mistakes or recategorise leads in a way that
      should not count towards your team's reporting goals.
    </p>
    <div class="mb-4 position-relative">
      <label class="form-label-title"
        for="">Move
        {{
        isPipelineLead ? "back to lead status" : "to another lead status"
        }}</label>
      <select-object :loading="statusesIsLoading"
        :options="statuses"
        :selected="selectedStatus"
        @change="selectStatusHandler"
        @click="delete errors?.status"
        autoSelected
        label="name"></select-object>
      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.status?.length">{{ errors?.status[0] }}</span>
    </div>

    <div class="mb-2 position-relative">
      <label class="form-label-title">Move from
        {{
        isPipelineLead ? "another pipeline stage" : "lead to pipeline stage"
        }}</label>
      <select-object :loading="pipelineIsLoading"
        :options="pipelines"
        :selected="selectedPipeline"
        @change="selectPipelineHandler"
        @click="delete errors?.pipeline"
        label="title"></select-object>
      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.pipeline?.length">{{ errors?.pipeline[0] }}</span>
    </div>
    <!-- Pipeline Stage Input -->
    <div class="mb-4 position-relative">
      <select-object :loading="stagesIsLoading"
        :options="pipelineStages"
        :selected="selectedStage"
        @change="selectPipelineStageHandler"
        @click="delete errors?.pipeline_stage"
        label="name"
        :disabled="!pipelineStages?.length"
        auto-selected></select-object>
      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.pipeline_stage?.length">{{ errors?.pipeline_stage[0] }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <button data-mdb-dismiss="modal"
        class="btn btn-danger">Close</button>
      <loading-button :disabled="!((selectedPipeline && selectedStage) || selectedStatus)"
        :is-loading="isSubmitMovePipelineOrStatus"
        @submit="leadMovePipelineOrStatus()">Confirm Move</loading-button>
    </div>
  </bootstrap-modal>
</template>