<script setup>
  import SelectObject from "../../components/fields/SelectObject.vue";
  import DropdownOwnerList from "../../components/dropdowns/DropdownOwnerList.vue";
  import { usePlatformStore } from "@stores";
  import { ref, onMounted, watch, computed } from "vue";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import { AvatarIcon } from "@assets/icons";

  const props = defineProps({
    isLost: { type: Boolean, default: false },
  });

  const platformStore = usePlatformStore();
  const errors = ref({});
  const modalRef = ref(null);
  const pipelineIsLoading = ref(false);
  const stagesIsLoading = ref(false);
  const usersIsLoading = ref(false);
  const workflowIsLoading = ref(false);

  const selectedPipeline = ref(null);
  const selectedStage = ref(null);
  const selectedOwner = ref(null);
  const selectedWorkflow = ref(null);
  const commant = ref(null);
  const isSubmit = ref(false);

  const pipelines = computed(() => platformStore.getPipelines);
  const pipelineStages = computed(() => platformStore.getPipelineStages);
  const leadPipeline = computed(() => platformStore.getLeadPipeline);
  const users = computed(() => platformStore.getUsers);
  const leadOwner = computed(() => platformStore.getLeadOwner);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const workflows = computed(() => platformStore.getWorkflows);

  function showModalHandler() {
    $toast.clear();
    errors.value = {};

    if (leadPipeline.value) selectedPipeline.value = { ...leadPipeline.value };
    if (leadOwner.value) selectedOwner.value = { ...leadOwner.value };

    selectPipelineHandler(selectedPipeline.value);

    if (!pipelines.value.length)
      platformStore.callFetchPipeline(function ({ loading, pipelines }) {
        pipelineIsLoading.value = loading;
      });

    if (!users.value?.length)
      platformStore.callFetchUsers(function ({ loading, users }) {
        usersIsLoading.value = loading;
      });

    if (!workflows.value?.length) {
      platformStore.callFetchWorkflows(editLeadId.value, ({ loading }) => {
        workflowIsLoading.value = loading;
      });
    }

    platformStore.setPipelineStages([]);
  }

  onMounted(() => {
    showModalHandler();
  });

  async function selectPipelineHandler(pipelineOption) {
    if (!pipelineOption) return;

    $toast.clear();
    errors.value = {};

    stagesIsLoading.value = true;
    selectedStage.value = null;
    selectedPipeline.value = pipelineOption;
    platformStore.setPipelineStages([]);

    await useApiRequest({
      url: `/stages/${pipelineOption.pipeline_id}/${props.isLost ? "lost" : "success"
        }`.trim(),
    })
      .then((res) => {
        platformStore.setPipelineStages(res);
        if (!res?.length)
          errors.value = {
            pipeline_stage: [
              `Pipeline ${props.isLost ? "lost" : "success"} stage not found.`,
            ],
          };
      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message);
      })
      .finally(() => {
        stagesIsLoading.value = false;
      });
  }

  async function handleSubmitLostOrWon() {
    $toast.clear();

    let url = `/platform/${editLeadId.value}/${props.isLost ? 'lost' : 'won'}`;
    let payload = {
      commant: commant.value,
      pipeline: selectedPipeline.value?.pipeline_id,
      pipeline_stage: selectedStage.value?.stage_id,
      workflow: selectedWorkflow.value?.workflow_id
    };

    if (selectedOwner.value) payload["owner"] = selectedOwner.value.user_id;
    isSubmit.value = true;

    await useApiRequest({
      url,
      method: "post",
      payload,
    }).then((res) => {
      const { success, errors: validation, message } = res;

      if (validation) return (errors.value = validation);

      platformStore.callFetchTimelineLogs();

      $toast[message.type](message.text);

      platformStore.setLeadStage({ ...selectedStage.value });

      platformStore.callFetchLeadStages(editLeadId.value);

      if (payload["owner"])
        platformStore.setLeadOwner({ ...selectedOwner.value });

      if (leadPipeline.value?.pipeline_id != payload['pipeline'])
        platformStore.setLeadPipeline({ ...selectedPipeline.value });

      if (selectedWorkflow.value) platformStore.callFetchLeadTasks(editLeadId.value);

      modalRef.value?.hide();

    }).catch((error) => {
      $toast.clear();
      $toast.error(error.message);
    })
      .finally(() => {

        isSubmit.value = false;

      });
  }
</script>

<template>
  <bootstrap-modal v-bind="$attrs"
    ref="modalRef"
    :dialog-style="{ width: '400px' }"
    :position="isLost ? 'centered' : 'normal'">
    <template #header>
      <div class="modal-header py-1">
        <h6 class="mb-0 fw-bold">
          {{ isLost ? "Lost deal's" : "Congratulations!" }}
        </h6>
        <button data-mdb-dismiss="modal"
          class="btn btn-light btn-sm btn-floating d-flex justify-content-center align-items-center">
          <font-awesome-icon icon="fas fa-close"
            class="fs-14px text-soft" />
        </button>
      </div>
    </template>
    <template #body>

      <div v-if="!isLost"
        class="mb-3">

        <label class="mb-2 fs-16px text-head">Select a Pipeline</label>

        <select-object :loading="pipelineIsLoading"
          :options="pipelines"
          :selected="selectedPipeline"
          @change="selectPipelineHandler"
          @click="delete errors?.pipeline"
          label="title"></select-object>

        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.pipeline?.length">
          {{ errors?.pipeline[0] }}
        </span>

      </div>

      <div class="mb-3">

        <label class="mb-2 fs-16px text-head">
          Select a {{ `${props.isLost ? "Lost " : "Success "}` }} Stage
        </label>

        <select-object :loading="stagesIsLoading"
          :options="pipelineStages"
          :selected="selectedStage"
          @change="(stage) => (selectedStage = stage)"
          @click="delete errors?.pipeline_stage"
          label="name"
          :disabled="!pipelineStages?.length"
          auto-selected></select-object>

        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.pipeline_stage?.length">
          {{ errors?.pipeline_stage[0] }}
        </span>

      </div>

      <div v-if="!isLost"
        class="mb-3 position-relative">

        <label class="mb-2 fs-16px text-head"> Change Owner</label>

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

        <dropdown-owner-list :loading="usersIsLoading"
          :lead-owner="selectedOwner ?? leadOwner"
          @change="(owner) => (selectedOwner = owner)"
          :dropdown-menu-style="{ width: '100%' }" />

        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.owner?.length">
          {{ errors?.owner[0] }}
        </span>

      </div>

      <div v-if="!isLost"
        class="mb-3">

        <label class="mb-2 fs-16px text-head"> Select workflow </label>

        <select-object :options="workflows"
          :selected="selectedWorkflow"
          :loading="workflowIsLoading"
          placeholder="Start new workflow"
          @change="(flow) => selectedWorkflow = flow"
          @click="delete errors?.workflow"
          label="title"></select-object>

        <span class="fs-14px text-danger py-1 w-100 d-block"
          v-if="errors?.workflow?.length">{{ errors?.workflow[0] }}</span>

      </div>

      <div class="mb-3">

        <label class="mb-2 fs-16px text-head">Commant</label>

        <textarea v-model="commant"
          class="form-control"
          rows="4"></textarea>

      </div>

      <div class="mt-5 d-flex justify-content-between align-items-center">

        <button class="btn btn-danger btn-sm"
          data-mdb-dismiss="modal">
          Cancel
        </button>

        <loading-button :is-loading="isSubmit"
          :disabled="!(selectedOwner && selectedPipeline && selectedStage)"
          @click="handleSubmitLostOrWon"
          class="btn btn-sm text-white"
          :class="{ 'btn-danger': isLost, 'btn-success': !isLost }">
          Confirm
        </loading-button>

      </div>
    </template>

  </bootstrap-modal>
</template>