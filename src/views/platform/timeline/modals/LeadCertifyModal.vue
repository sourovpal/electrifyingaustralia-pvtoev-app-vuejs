<script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import { usePlatformStore } from "@stores";
  import { useRouter } from "vue-router";
  import ImageSmiley from '@assets/gif/sunglasses-smiley.gif';
  import ImageSad from '@assets/gif/sad-face-emoji.gif';
  import ImageVictoryHand from '@assets/gif/victory-hand-people.gif';
  import ImageSmileyFace from '@assets/gif/smiling-face-people.gif';

  const emits = defineEmits(["close"]);
  const props = defineProps({
    action: {
      type: String,
      validator: value => ['certify', 'lost', 'success', 'reopen'].includes(value),
      require: true,
    },
  });

  const router = useRouter();
  const platformStore = usePlatformStore();
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const leadOwner = computed(() => platformStore.getLeadOwner);
  const users = computed(() => platformStore.getUsers);
  const pipelines = computed(() => platformStore.getPipelines);
  const workflows = computed(() => platformStore.getWorkflows);
  const certifyModalAction = computed(() => platformStore.getCertifyModalAction);

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

    selectedOwner.value = leadOwner.value;

    if (props.action == 'lost') {

      let pipeline = platformStore.getLeadPipeline;
      if (!Object.keys(pipeline).length) return;

      selectedPipeline.value = pipeline;

      selectPipelineHandler();

      return;
    }

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

  });

  function hideModalHandler() {
    platformStore.setCertifyModalAction(false);
    emits("close", false);
  }

  async function selectPipelineHandler() {
    if (!selectedPipeline.value) return;

    $toast.clear();
    errors.value = {};

    stagesIsLoading.value = true;
    selectedStage.value = null;
    pipelineStages.value = [];

    let url = `/platform/stages/${selectedPipeline.value.pipeline_id}`

    if (props.action == 'lost') url += '/lost';
    else if (props.action == 'success') url += '/success';
    else url += '/all';

    await useApiRequest({
      url,
    })
      .then((res) => {

        pipelineStages.value = res;

        if (res?.length) return;

        errors.value = {
          pipeline_stage: [`Pipeline ${(props.action == 'reopen' || props.action == 'certify') ?
            'primary' : props.action} stage not found.`]
        };

      })
      .catch((error) => {
        $toast.error(error.message.text);
      })
      .finally(() => {
        stagesIsLoading.value = false;
      });
  }

  function selectOwnerHandler(owner) {
    $toast.clear();
    selectedOwner.value = owner;
  }

  async function confirmQualifyHandler() {
    isSubmitConfirmQualify.value = true;

    let payload = {
      action: props.action,
      lead_id: editLeadId.value,
      pipeline: selectedPipeline.value?.pipeline_id,
      pipeline_stage: selectedStage.value?.stage_id,
      owner: selectedOwner.value?.user_id,
      commant: commant.value,
      workflow: selectedWorkflow.value?.workflow_id,
    };

    await useApiRequest({
      url: `/platform/deals/${editLeadId.value}/${props.action}`,
      method: "post",
      payload,
    }).then((res) => {

      const { success, message, errors: validation } = res;

      if (validation) return errors.value = validation;

      $toast[message.type](message.text);

      platformStore.callFetchTimelineLogs();
      platformStore.setLeadOwner(selectedOwner.value);
      platformStore.setLeadPipeline(selectedPipeline.value);
      platformStore.setLeadStage(selectedStage.value);
      platformStore.callFetchLeadStages(editLeadId.value);

      if (props.action == 'certify') {

        platformStore.callFetchProperties(editLeadId.value);

        platformStore.setIsPipelineLead(true);

        router.push({ path: `/platform/deals/${editLeadId.value}` });

      }
      hideModalHandler();

    }).catch((error) => {
      $toast.error(error.message.text);
    }).finally(() => {
      isSubmitConfirmQualify.value = false;
    });

  }
</script>

<template>
  <modal-dialog modal
    :visible="(!!certifyModalAction)"
    pt:root:class="rounded-2 mh-100"
    pt:mask:class="backdrop-blur-sm"
    :style="{ width: '18vw' }"
    :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">

    <template #container="{closeCallback}">

      <div class="px-3 pt-3 d-flex jsutify-content-between align-items-center">

        <template v-if="action == 'certify' || action == 'success'">
          <div class="d-flex justify-content-center align-items-center w-100 flex-column">
            <div class="d-block">
              <img v-if="action == 'certify'"
                :src="ImageSmiley"
                width="30">
              <img v-else
                :src="ImageVictoryHand"
                width="30">
            </div>
            <span class="d-block text-head fw-bold fs-18px fw-bold">Congratulations!</span>
          </div>
        </template>

        <template v-if="action == 'reopen'">
          <div class="d-flex justify-content-center align-items-center w-100 flex-column">
            <div class="d-block">
              <img :src="ImageSmileyFace"
                width="30">
            </div>
            <span class="d-block text-head fw-bold fs-18px">Reopening Deals</span>
          </div>
        </template>

        <template v-if="action == 'lost'">
          <div class="d-flex justify-content-center align-items-center w-100 flex-column">
            <div class="d-block">
              <img :src="ImageSad"
                width="30">
            </div>
            <span class="d-block text-head fw-bold fs-18px">Lost Deals</span>
          </div>
        </template>

      </div>

      <div class="px-3 py-3">

        <div v-if="action != 'lost'"
          class="mb-3">

          <label class="mb-2 fs-16px text-head">
            Select a pipeline
            <span class="text-soft fs-12px ms-1">(Required)</span>
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
            v-if="errors?.pipeline?.length">
            {{ errors?.pipeline[0] }}
          </span>
        </div>

        <div class="mb-3">

          <label class="mb-2 fs-16px text-head">
            <template v-if="action=='lost'">Select a lost stage</template>
            <template v-else-if="action=='success'">Select a won stage</template>
            <template v-else>Select a stage</template>
            <span class="text-soft fs-12px ms-1">(Required)</span>
          </label>

          <select-option :loading="stagesIsLoading"
            filter
            v-model="selectedStage"
            :options="pipelineStages"
            @click="delete errors?.pipeline_stage"
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
            v-if="errors?.pipeline_stage?.length">
            {{ errors?.pipeline_stage[0] }}
          </span>

        </div>

        <div v-if="action != 'lost'"
          class="mb-3">

          <label class="mb-2 fs-16px text-head">
            Start a workflow
            <span class="text-soft fs-12px ms-1">(Optional)</span>
          </label>

          <select-option :loading="workflowIsLoading"
            filter
            v-model="selectedWorkflow"
            :options="workflows"
            @click="delete errors?.pipeline_stage"
            :filterFields="['title']"
            optionLabel="title"
            placeholder="Select a workflow"
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
            v-if="errors?.workflow?.length">{{ errors?.workflow[0] }}</span>
        </div>

        <div v-if="action != 'lost'"
          class="mb-3">

          <label class="mb-2 fs-16px text-head">
            Change Owner
            <span class="text-soft fs-12px ms-1">(Optional)</span>
          </label>

          <select-option filter
            :filter-fields="['name', 'email']"
            :loading="usersIsLoading"
            v-model="selectedOwner"
            :options="users"
            optionLabel="name"
            placeholder="Select a owner"
            class="w-100 select-option-small"
            panel-class="panel-option-small">

            <template #value="slotProps">

              <div v-if="slotProps.value"
                class="d-flex justify-context-start align-items-center">

                <div class="circle-avatar me-2"
                  style="--height: 1.4rem; --width: 1.4rem">

                  <img :alt="slotProps.value.name"
                    :src="slotProps.value.profile_avatar"
                    class="avatar" />

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

                  <div class="circle-avatar me-2"
                    style="--height: 1.6rem; --width: 1.6rem">

                    <img :alt="slotProps.option?.name"
                      :src="slotProps.option?.profile_avatar"
                      class="avatar" />

                  </div>

                  <div class="owner-name fs-14px text-hard">

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

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.owner?.length">{{ errors?.owner[0] }}</span>

        </div>

        <div class="mb-3">

          <label class="mb-2 fs-16px text-head">
            Leave a comment
            <span class="text-soft fs-12px ms-1">(Optional)</span>
          </label>

          <text-area v-model="commant"
            class="form-control"
            rows="3"
            @click="delete errors?.owner"></text-area>

          <span class="fs-14px text-danger py-1 w-100 d-block"
            v-if="errors?.commant?.length">
            {{ errors?.commant[0] }}
          </span>

        </div>

        <div class="d-flex justify-content-between align-items-center">

          <danger-button @click="hideModalHandler"
            label="Close">
          </danger-button>

          <success-button class="btn-sm"
            :disabled="!selectedOwner || !selectedPipeline || !selectedStage || isSubmitConfirmQualify"
            :loading="isSubmitConfirmQualify"
            @click="confirmQualifyHandler"
            label="Submit">
          </success-button>

        </div>

      </div>

    </template>

  </modal-dialog>

</template>

<style lang="scss"
  scoped>
  :deep(.owner-name) {
    line-height: 16px;
  }
</style>