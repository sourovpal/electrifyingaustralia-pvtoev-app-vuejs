<script setup>
  import { Modal } from "mdb-ui-kit";
  import DropdownOwnerList from "../../components/dropdowns/DropdownOwnerList.vue";
  import { usePlatformStore } from "@stores";
  import SelectObjectId from '../../components/fields/SelectObjectId.vue';
  import { AvatarIcon } from "@assets/icons";
  import { ref, onMounted, watch, computed, defineExpose } from 'vue';
  import { $toast } from '@config';
  import { useApiRequest } from '@actions';

  const platformStore = usePlatformStore();
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadOwner = computed(() => platformStore.getLeadOwner);
  const users = computed(() => platformStore.getUsers);
  const pipelines = computed(() => platformStore.getPipelines);

  const errors = ref({});
  const commant = ref(null);
  const leadQualifyModalRef = ref(null);
  const modalInstance = ref(null);
  const selectedOwner = ref(null);
  const selectedPipeline = ref(null);
  const selectedStage = ref(null);
  const isSubmitConfirmQualify = ref(false);
  const pipelineStages = ref([]);

  const pipelineIsLoading = ref(false);
  const stagesIsLoading = ref(false);
  const usersIsLoading = ref(false);

  onMounted(() => {
    modalInstance.value = new Modal(leadQualifyModalRef.value);
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

    errors.value = {};
    selectedOwner.value = leadOwner.value;
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
    selectedStage.value = null;
    selectedPipeline.value = pipelineOption;
    platformStore.callFetchPipelineStages(pipelineOption.pipeline_id, function ({ loading, stages, message }) {
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
    selectedStage.value = selectedOption;
  }

  function selectOwnerHandler(owner) {
    $toast.clear();
    selectedOwner.value = owner;
  }

  async function confirmQualifyHandler() {
    await useApiRequest({
      url: `leads/${editLeadId.value}/confirm-qualify`,
      method: 'POST',
      payload: {
        lead_id: editLeadId.value,
        pipeline: selectedPipeline.value?.pipeline_id,
        pipeline_stage: selectedStage.value?.stage_id,
        owner: selectedOwner.value?.user_id,
        commant: commant.value,
      }
    }).then(res => {
      const { success, message, ...args } = res;
      if (args.errors) {
        errors.value = args.errors;
        return;
      }
      platformStore.callFetchTimelineLogs();
      platformStore.setLeadPipeline(selectedPipeline.value);
      platformStore.setLeadStage(selectedStage.value);
      platformStore.callFetchLeadStages(platformStore.getEditLeadId);
      platformStore.callFetchProperties(platformStore.getEditLeadId);
      hideModalHandler();
      platformStore.setIsPipelineLead(true);
      $toast[message.type](message.text);
    }).catch(error => {
      $toast.error("Oops, something went wrong");
    });
  }


  defineExpose({
    showModalHandler,
    hideModalHandler
  });
</script>

<template>
  <div class="modal fade add-new-lead-modal"
    ref="leadQualifyModalRef">
    <div class="modal-dialog modal-dialog-centered- modal-sm mx-auto"
      style="max-width: 350px">
      <div class="modal-content">
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
              @click="hideModalHandler()">
              <font-awesome-icon icon="fas fa-close"
                class="text-soft fs-14px"></font-awesome-icon>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Select a pipeline
              <span class="text-soft fs-12px ms-1">(Required)</span>
            </label>
            <select-object-id :loading="pipelineIsLoading"
              :options="pipelines"
              :selected="selectedPipeline"
              @change="selectPipelineHandler"
              @click="delete errors?.pipeline"
              label="title" />
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.pipeline?.length">{{ errors?.pipeline[0] }}</span>
          </div>

          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Select a stage
              <span class="text-soft fs-12px ms-1">(Required)</span>
            </label>
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

          <div class="mb-3 position-relative">
            <label class="form-label-title"
              for="">Start a workflow
              <span class="text-soft fs-12px ms-1">(Optional)</span>
            </label>
            <input @click="delete errors?.lead_status"
              class="form-control cursor-pointer select-none"
              type="text"
              data-mdb-toggle="dropdown"
              readonly />
            <div class="dropdown-menu fade custom-form-select overflow-auto slim-scrollbar-"
              style="max-height: 125px">
              <ul class="list-unstyled mb-0">
                <li v-for="(item, index) in []"
                  :key="index"
                  @click="selectleadStatus(item)"
                  :class="`dropdown-item text-hard fw-bold fs-14px d-flex py-1 ${
                    status?.id == item.id ? 'selected' : ''
                  }`">
                  {{ item.name }}
                  <svg v-if="item.is_lost"
                    class="svg-5 ms-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 0 24 24"
                    width="18">
                    <path d="M0 0h24v24H0z"
                      fill="none"></path>
                    <path
                      d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z">
                    </path>
                  </svg>
                </li>
              </ul>
            </div>
            <span class="fs-14px text-danger py-1 w-100 d-block"
              v-if="errors?.lead_status?.length">{{ errors?.lead_status[0] }}</span>
          </div>

          <div class="mb-3 add-new-lead-owner-list-dropdown position-relative">
            <label class="form-label-title"
              for="">Owner
              <span class="text-soft fs-12px ms-1">(Optional)</span></label>
            <div class="form-control cursor-pointer owner-form-control select-none"
              data-mdb-toggle="dropdown"
              @click="delete errors?.owner">
              <div class="owner-info">
                <div class="circle-avatar me-2">
                  <img class="avatar"
                    :src="selectedOwner?.profile_avatar??AvatarIcon"
                    alt="Profile" />
                </div>
                <div class="owner-name fs-16px fw--bold text-hard">
                  {{ selectedOwner?.name ?? "No Owner" }}
                </div>
              </div>
            </div>
            <dropdown-owner-list ref="dropdownOwnerListRef"
              :owner="leadOwner"
              @change="selectOwnerHandler" />
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
            <button @click="hideModalHandler()"
              class="btn btn-danger">
              Close
            </button>
            <loading-button :disabled="(!selectedOwner || !selectedPipeline || !selectedStage)"
              :is-loading="isSubmitConfirmQualify"
              @submit="confirmQualifyHandler">Confirm Qualify</loading-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>