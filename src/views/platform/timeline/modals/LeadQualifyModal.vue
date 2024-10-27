<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { $toast } from "@config";
import { useApiRequest } from "@actions";
import { usePlatformStore } from "@stores";
import { useRouter } from "vue-router";

const emits = defineEmits(["close"]);
const router = useRouter();
const platformStore = usePlatformStore();
const editLeadId = computed(() => platformStore.getEditLeadId);
const leadOwner = computed(() => platformStore.getLeadOwner);
const users = computed(() => platformStore.getUsers);
const pipelines = computed(() => platformStore.getPipelines);
const workflows = computed(() => platformStore.getWorkflows);

const errors = ref({});
const commant = ref(null);
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
  if (!pipelines.value.length)
    platformStore.callFetchPipeline(function ({ loading, pipelines }) {
      pipelineIsLoading.value = loading;
    });

  if (!users.value?.length)
    platformStore.callFetchUsers(function ({ loading, users }) {
      usersIsLoading.value = loading;
    });

  if (!workflows.value?.length)
    platformStore.callFetchWorkflows(editLeadId.value, ({ loading }) => {
      workflowIsLoading.value = loading;
    });

  selectedOwner.value = leadOwner.value;
});

function hideModalHandler() {
  emits("close", false);
}

async function selectPipelineHandler() {
  $toast.clear();

  errors.value = {};

  selectedStage.value = null;

  platformStore.callFetchPipelineStages(
    selectedPipeline.value?.pipeline_id,
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
      workflow: selectedWorkflow.value?.workflow_id,
    },
  })
    .then((res) => {
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
    })
    .catch((error) => {
      $toast.clear();
      $toast.error(error.message);
    })
    .finally(() => {
      isSubmitConfirmQualify.value = true;
    });
}
</script>

<template>
  <modal-dialog
    v-bind="$attrs"
    modal
    header-class="py-2"
    pt:root:class="!border-0 !bg-transparent overflow-hidden"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '22vw' }"
  >
    <template #container="{}">
      <div class="px-3 pt-3 d-flex jsutify-content-between align-items-center">
        <div class="d-flex justify-content-center align-items-center py-0">
          <i class="pi pi-check-circle me-2"></i>
          <span class="text-hard fw-bold fs-18px">Congratulations!</span>
        </div>
        <div>
          <button @click="hideModalHandler" class="btn btn-light btn-sm btn-floating d-lg-none">
            <font-awesome-icon
              icon="fas fa-close"
              class="text-soft fs-14px"
            ></font-awesome-icon>
          </button>
        </div>
      </div>
      <div class="px-3 py-3">
        <div class="mb-3">
          <label class="mb-2 fs-16px text-head">
            Select a pipeline
            <span class="text-soft fs-12px ms-1">(Required)</span>
          </label>

          <select-option
            :loading="pipelineIsLoading"
            filter
            autoFilterFocus
            v-model="selectedPipeline"
            :options="pipelines"
            @click="delete errors?.pipeline"
            @change="selectPipelineHandler"
            :filterFields="['title']"
            optionLabel="title"
            placeholder="Select a pipeline"
            class="w-100"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
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

          <span
            class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.pipeline?.length"
          >
            {{ errors?.pipeline[0] }}
          </span>
        </div>

        <div class="mb-3">
          <label class="mb-2 fs-16px text-head">
            Select a stage
            <span class="text-soft fs-12px ms-1">(Required)</span>
          </label>

          <select-option
            :loading="stagesIsLoading"
            filter
            autoFilterFocus
            v-model="selectedStage"
            :options="pipelineStages"
            @click="delete errors?.pipeline_stage"
            :filterFields="['name']"
            optionLabel="name"
            placeholder="Select a stage"
            class="w-100"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
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

          <span
            class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.pipeline_stage?.length"
            >{{ errors?.pipeline_stage[0] }}</span
          >
        </div>

        <div class="mb-3">
          <label class="mb-2 fs-16px text-head">
            Start a workflow
            <span class="text-soft fs-12px ms-1">(Optional)</span>
          </label>

          <select-option
            :loading="workflowIsLoading"
            filter
            autoFilterFocus
            v-model="selectedWorkflow"
            :options="workflows"
            @click="delete errors?.pipeline_stage"
            :filterFields="['title']"
            optionLabel="title"
            placeholder="Select a workflow"
            class="w-100"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
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

          <span
            class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.workflow?.length"
            >{{ errors?.workflow[0] }}</span
          >
        </div>

        <div class="mb-3">
          <label class="mb-2 fs-16px text-head">
            Change Owner
            <span class="text-soft fs-12px ms-1">(Optional)</span>
          </label>

          <select-option
            filter
            :filter-fields="['name', 'email']"
            :loading="usersIsLoading"
            v-model="selectedOwner"
            :options="users"
            optionLabel="name"
            placeholder="Select a Country"
            class="w-100"
          >
            <template #value="slotProps">
              <div
                v-if="slotProps.value"
                class="d-flex justify-context-start align-items-center"
              >
                <div
                  class="circle-avatar me-2"
                  style="--height: 25px; --width: 25px"
                >
                  <img
                    :alt="slotProps.value.name"
                    :src="slotProps.value.profile_avatar"
                    class="avatar"
                  />
                </div>
                <div class="owner-name fs-16px text-hard">
                  {{ slotProps.value.name || slotProps.value.email }}
                </div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="d-block">
                <div class="d-flex justify-context-start align-items-center">
                  <div
                    class="circle-avatar me-2"
                    style="--height: 32px; --width: 32px"
                  >
                    <img
                      :alt="slotProps.option?.name"
                      :src="slotProps.option?.profile_avatar"
                      class="avatar"
                    />
                  </div>
                  <div class="owner-name fs-16px fw--bold text-hard">
                    <div class="">
                      {{ slotProps.option?.name }}
                    </div>
                    <div class="text-soft fs-14px">
                      {{ slotProps.option?.email }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </select-option>

          <span
            class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.owner?.length"
            >{{ errors?.owner[0] }}</span
          >
        </div>

        <div class="mb-3">
          <label class="mb-2 fs-16px text-head">
            Leave a comment
            <span class="text-soft fs-12px ms-1">(Optional)</span>
          </label>
          <text-area
            v-model="commant"
            class="form-control"
            rows="3"
            @click="delete errors?.owner"
          ></text-area>
          <span
            class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.commant?.length"
            >{{ errors?.commant[0] }}</span
          >
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <button @click="hideModalHandler" class="btn btn-danger">
            Close
          </button>
          <loading-button
            :disabled="!selectedOwner || !selectedPipeline || !selectedStage"
            :is-loading="isSubmitConfirmQualify"
            @submit="confirmQualifyHandler"
            >Confirm</loading-button
          >
        </div>
      </div>
    </template>
  </modal-dialog>
</template>
<style lang="scss" scoped>
:deep(.owner-name) {
  line-height: 16px;
}
</style>