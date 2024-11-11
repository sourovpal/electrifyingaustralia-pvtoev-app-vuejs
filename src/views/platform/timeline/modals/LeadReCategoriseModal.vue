<script setup>
  import { usePlatformStore } from "@stores";
  import { useAppStore } from "@stores";
  import SelectObject from "../../components/fields/SelectObject.vue";
  import { ref, onMounted, watch, computed } from "vue";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import { useRouter } from "vue-router";

  const emits = defineEmits(['close']);

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

  async function selectPipelineHandler() {

    $toast.clear();

    errors.value = {};

    selectedStatus.value = null;
    selectedStage.value = null;

    platformStore.setPipelineStages([]);

    platformStore.callFetchPipelineStages(
      selectedPipeline.value.pipeline_id,
      function ({ loading, stages }) {

        stagesIsLoading.value = loading;

        if (!loading && stages && !stages?.length) {

          errors.value = { pipeline_stage: ["Pipeline stage not found."] };
        }

      }

    );
  }

  function selectPipelineStageHandler() {
    $toast.clear();
    errors.value = {};
    selectedStatus.value = null;
  }

  function selectStatusHandler() {
    $toast.clear();
    errors.value = {};
    selectedPipeline.value = null;
    selectedStage.value = null;
  }

  async function leadMovePipelineOrStatus() {

    $toast.clear();

    errors.value = {};

    var leadId = platformStore.getEditLeadId;
    isSubmitMovePipelineOrStatus.value = true;

    var data = {
      status_id: selectedStatus.value?.status_id ?? null,
      pipeline_id: selectedPipeline.value?.pipeline_id ?? null,
      pipeline_stage_id: selectedStage.value?.stage_id ?? null,
    };

    await useApiRequest({
      url: `/platform/deals/${leadId}/move`,
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

        emits('close', true);

      })
      .catch((error) => {
        $toast.error(error.message);
      });

    isSubmitMovePipelineOrStatus.value = false;
  }
</script>

<template>
  <modal-dialog modal
    v-bind="$attrs"
    pt:root:class="rounded-2 mh-100 px-3 py-3"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '18vw' }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">
    <template #container>

      <div class="d-flex justify-content-start align-items-center mb-3">
        <h6 class="text-hard mb-0 fs-18px fw-bold">Move Deals</h6>
      </div>
      <div class="mb-3 position-relative">

        <label class="form-label-title">
          Move {{ isPipelineLead ? "back to lead status" : "to another lead status" }}
        </label>

        <select-option filter
          @change="selectStatusHandler"
          @click="delete errors?.status"
          v-model="selectedStatus"
          :loading="statusesIsLoading"
          :options="statuses"
          :filterFields="['name']"
          optionLabel="name"
          placeholder="Select a status"
          class="w-100 select-option-small"
          panel-class="panel-option-small">
          <template #value="slotProps">
            <div v-if="slotProps.value"
              class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </select-option>

        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.status?.length">
          {{ errors?.status[0] }}
        </span>

      </div>

      <div class="mb-2 position-relative">

        <label class="form-label-title">
          Move from {{ isPipelineLead ? "another pipeline stage" : "lead to pipeline stage"}}
        </label>

        <select-option :loading="pipelineIsLoading"
          filter
          v-model="selectedPipeline"
          :options="pipelines"
          @click="delete errors?.pipeline"
          @change="selectPipelineHandler"
          :filterFields="['title']"
          optionLabel="title"
          placeholder="Select a pipeline"
          class="w-100 select-option-small"
          panel-class="panel-option-small">

          <template #value="slotProps">

            <div v-if="slotProps.value"
              class="flex items-center">
              <div>{{ slotProps.value.title }}</div>
            </div>

            <span v-else>
              {{ slotProps.placeholder }}
            </span>

          </template>

          <template #option="slotProps">

            <div class="flex items-center">
              <div>{{ slotProps.option.title }}</div>
            </div>

          </template>

        </select-option>

        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.pipeline?.length">{{ errors?.pipeline[0] }}</span>

      </div>
      <!-- Pipeline Stage Input -->
      <div class="mb-4 position-relative">

        <select-option :loading="stagesIsLoading"
          filter
          :disabled="!pipelineStages?.length"
          v-model="selectedStage"
          :options="pipelineStages"
          @click="delete errors?.pipeline_stage"
          @change="selectPipelineStageHandler"
          :filterFields="['name']"
          optionLabel="name"
          placeholder="Select a stage"
          class="w-100 select-option-small"
          panel-class="panel-option-small">

          <template #value="slotProps">

            <div v-if="slotProps.value"
              class="flex items-center">
              <div>{{ slotProps.value.name }}</div>
            </div>

            <span v-else>
              {{ slotProps.placeholder }}
            </span>

          </template>

          <template #option="slotProps">

            <div class="flex items-center">
              <div>{{ slotProps.option.name }}</div>
            </div>

          </template>
        </select-option>


        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.pipeline_stage?.length">{{ errors?.pipeline_stage[0] }}</span>

      </div>

      <div class="d-flex justify-content-between align-items-center">

        <button @click="emits('close', false)"
          class="btn btn-danger">Close</button>

        <loading-button :disabled="!((selectedPipeline && selectedStage) || selectedStatus)"
          :is-loading="isSubmitMovePipelineOrStatus"
          @submit="leadMovePipelineOrStatus()">Confirm Move</loading-button>

      </div>

    </template>

  </modal-dialog>

</template>