<script setup>
  import DropdownOwnerList from "../../components/dropdowns/DropdownOwnerList.vue";
  import SelectObject from "../../components/fields/SelectObject.vue";
  import { AvatarIcon } from "@assets/icons";
  import { ref, onMounted, watch, computed } from "vue";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import { usePlatformStore } from "@stores";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const platformStore = usePlatformStore();
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadOwner = computed(() => platformStore.getLeadOwner);
  const users = computed(() => platformStore.getUsers);
  const pipelines = computed(() => platformStore.getPipelines);
  const workflows = computed(() => platformStore.getWorkflows);

  const errors = ref({});
  const commant = ref(null);
  const leadQualifyModalRef = ref(null);
  const selectedOwner = ref(null);
  const selectedPipeline = ref(null);
  const selectedWorkflow = ref(null);
  const selectedStage = ref(null);
  const isSubmitConfirmQualify = ref(false);
  const pipelineStages = ref([]);

  const pipelineIsLoading = ref(false);
  const stagesIsLoading = ref(false);
  const usersIsLoading = ref(false);
  const workflowIsLoading = ref(false);
  
  onMounted(() => {
    showModalHandler();
  });

  function showModalHandler() {
    $toast.clear();

    if (!pipelines.value.length) {
      platformStore.callFetchPipeline(function ({ loading, pipelines }) {
        pipelineIsLoading.value = loading;
      });
    }

    if (!users.value?.length) {
      platformStore.callFetchUsers(function ({ loading, users }) {
        usersIsLoading.value = loading;
      });
    }

    if (!workflows.value?.length) {
      platformStore.callFetchWorkflows(editLeadId.value, ({ loading }) => {
        workflowIsLoading.value = loading;
      });
    }

    errors.value = {};
    selectedOwner.value = leadOwner.value;
    selectedPipeline.value = null;
    selectedStage.value = null;
    pipelineStages.value = [];
  }

  function hideModalHandler() {
    leadQualifyModalRef.value.hide();
  }

  async function selectPipelineHandler(pipelineOption) {
    $toast.clear();
    errors.value = {};
    selectedStage.value = null;
    selectedPipeline.value = pipelineOption;

    platformStore.callFetchPipelineStages(
      pipelineOption.pipeline_id,
      function ({ loading, stages, message }) {

        stagesIsLoading.value = loading;

        if (!loading && stages) {
          pipelineStages.value = stages;

          if (!stages.length) {
            errors.value = { pipeline_stage: ["Pipeline stage not found."] };
          }

        } else if (message) {

          $toast.error(message.text);

        }
      }
    );

  }

  function selectPipelineStageHandler(selectedOption) {
    $toast.clear();
    errors.value = {};
    selectedStage.value = selectedOption;
  }

  function selectOwnerHandler(owner) {
    $toast.clear();
    selectedOwner.value = owner;
  }

  async function confirmQualifyHandler() {
    isSubmitConfirmQualify.value = true;

    await useApiRequest({
      url: `leads/${editLeadId.value}/confirm-qualify`,
      method: "POST",
      payload: {
        lead_id: editLeadId.value,
        pipeline: selectedPipeline.value?.pipeline_id,
        pipeline_stage: selectedStage.value?.stage_id,
        owner: selectedOwner.value?.user_id,
        commant: commant.value,
        workflow: selectedWorkflow.value?.workflow_id
      },
    }).then((res) => {
      const { success, message, errors: validation } = res;

      if (validation) {
        errors.value = validation;
        return;
      }

      platformStore.callFetchTimelineLogs();
      platformStore.setLeadPipeline(selectedPipeline.value);
      platformStore.setLeadStage(selectedStage.value);
      platformStore.callFetchLeadStages(editLeadId.value);
      platformStore.callFetchProperties(editLeadId.value);

      hideModalHandler();

      platformStore.setIsPipelineLead(true);

      router.push({ path: `/platform/deals/${editLeadId.value}` });

      $toast[message.type](message.text);
    }).catch((error) => {
      $toast.error("Oops, something went wrong");
    }).finally(() => {
      isSubmitConfirmQualify.value = true;
    });
  }
</script>

<template>
  <bootstrap-modal v-bind="$attrs"
    ref="leadQualifyModalRef"
    :dialog-style="{ 'max-width': '350px' }"
    size="sm">
    <template #header>
      <div class="modal-header py-2">
        <div class="d-flex justify-content-center align-items-center py-0">
          <svg class="svg-5 me-1"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fill="#000000">
            <path d="M0 0h24v24H0V0z"
              fill="none"></path>
            <circle cx="15.5"
              cy="9.5"
              r="1.5"></circle>
            <circle cx="8.5"
              cy="9.5"
              r="1.5"></circle>
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2s-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5z">
            </path>
          </svg>
          <span class="text-hard fw-bold fs-16px">Congratulations!</span>
        </div>
        <div>
          <button class="btn btn-light btn-sm btn-floating d-lg-none"
            data-mdb-dismiss="modal">
            <font-awesome-icon icon="fas fa-close"
              class="text-soft fs-14px"></font-awesome-icon>
          </button>
        </div>
      </div>
    </template>
    <div class="mb-3 position-relative">
      <label class="form-label-title"
        for="">Select a pipeline
        <span class="text-soft fs-12px ms-1">(Required)</span>
      </label>
      <select-object :loading="pipelineIsLoading"
        :options="pipelines"
        :selected="selectedPipeline"
        @change="selectPipelineHandler"
        @fatch="selectPipelineHandler"
        @click="delete errors?.pipeline"
        label="title"
        auto-selected />
      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.pipeline?.length">{{ errors?.pipeline[0] }}</span>
    </div>

    <div class="mb-3 position-relative">

      <label class="form-label-title"
        for="">Select a stage
        <span class="text-soft fs-12px ms-1">(Required)</span>
      </label>

      <select-object :disabled="!pipelineStages.length"
        :loading="stagesIsLoading"
        :options="pipelineStages"
        :selected="selectedStage"
        @change="selectPipelineStageHandler"
        @click="delete errors?.pipeline_stage"
        label="name"
        auto-selected />

      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.pipeline_stage?.length">{{ errors?.pipeline_stage[0] }}</span>

    </div>

    <div class="mb-3 position-relative">

      <label class="form-label-title"
        for="">Start a workflow
        <span class="text-soft fs-12px ms-1">(Optional)</span>
      </label>

      <select-object :disabled="!pipelineStages.length"
        :loading="workflowIsLoading"
        :options="workflows"
        :selected="selectedWorkflow"
        @change="(flow) => selectedWorkflow = flow"
        @click="delete errors?.workflow"
        label="title"
        placeholder="Select new workflow" />

      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.workflow?.length">{{ errors?.workflow[0] }}</span>

    </div>

    <div class="mb-3 add-new-lead-owner-list-dropdown position-relative">

      <label class="form-label-title"
        for="">Owner <span class="text-soft fs-12px ms-1">(Optional)</span></label>

      <div class="form-control cursor-pointer owner-form-control select-none"
        data-mdb-toggle="dropdown"
        @click="delete errors?.owner">
        <div class="owner-info">

          <div class="circle-avatar me-2">
            <img class="avatar"
              :src="selectedOwner?.profile_avatar ?? AvatarIcon"
              alt="Profile" />
          </div>

          <div class="owner-name fs-16px fw--bold text-hard">
            {{ selectedOwner?.name || selectedOwner?.email || "No Owner" }}
          </div>

        </div>
      </div>

      <dropdown-owner-list ref="dropdownOwnerListRef"
        :lead-owner="leadOwner"
        @change="selectOwnerHandler"
        :dropdown-menu-style="{ width: '100%' }" />
      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.owner?.length">{{ errors?.owner[0] }}</span>
    </div>

    <div class="mb-3 position-relative">
      <label class="form-label-title"
        for="">Leave a comment
        <span class="text-soft fs-12px ms-1">(Optional)</span>
      </label>
      <textarea v-model="commant"
        class="form-control"
        rows="3"
        @click="delete errors?.owner"></textarea>
      <span class="fs-14px text-danger py-1 w-100 d-block"
        v-if="errors?.commant?.length">{{ errors?.commant[0] }}</span>
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <button data-mdb-dismiss="modal"
        class="btn btn-danger">Close</button>
      <loading-button :disabled="!selectedOwner || !selectedPipeline || !selectedStage"
        :is-loading="isSubmitConfirmQualify"
        @submit="confirmQualifyHandler">Confirm Qualify</loading-button>
    </div>
  </bootstrap-modal>
</template>