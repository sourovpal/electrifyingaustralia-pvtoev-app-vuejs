<script setup>
  import CustomScrollbar from "custom-vue-scrollbar";
  import ActionBar from "@components/ActionBar/ActionBar.vue";
  import { usePlatformStore } from "@stores";
  import { timeDifference } from "@helpers";
  import { ref, computed, watchEffect } from "vue";
  import { Skeletor } from "vue-skeletor";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";
  import LostOrWonModal from "../modals/LostOrWonModal.vue";
  import LeadReopenModal from "../modals/LeadReopenModal.vue";

  const platformStore = usePlatformStore();
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
  const leadPrimaryStages = computed(() => platformStore.getLeadPrimaryStages);
  const leadStage = computed(() => platformStore.getLeadStage);
  const leadPipeline = computed(() => platformStore.getLeadPipeline);
  const isLoadingStageId = ref(null);
  const lastStagePosition = ref(null);
  const toggleLostOrWonModal = ref(false);
  const toggleReopenModal = ref(false);
  const isLost = ref(false);

  function handlePipelineStageUpdate(stage) {
    $toast.clear();

    if (leadStage.value?.status == "lost" || leadStage.value?.status == "success")
      return;

    if (leadStage.value?.stage_id == stage.stage_id)
      return $toast.warning("Currently stay this stage.");

    isLoadingStageId.value = stage.stage_id;

    var data = {
      pipeline: leadPipeline.value?.pipeline_id,
      pipeline_stage: stage.stage_id,
    };

    const res = useApiRequest({
      url: `/leads/${editLeadId.value}/move-lead`,
      method: "post",
      payload: data,
    })
      .then((res) => {
        const { success, message, ...args } = res;
        if (!success && args.errors) {
          $toast.error("Oops, something went wrong");
          return;
        }
        platformStore.setLeadStage(stage);
        platformStore.callFetchLeadStages(
          platformStore.getEditLeadId,
          ({ loading }) => {
            if (!loading) {
              isLoadingStageId.value = null;
            }
          }
        );
      })
      .catch((error) => {
        $toast.error("Oops, something went wrong");
      });
  }

  function handleToggleModal(stage, lost) {
    if (leadStage.value?.status != "primary") return;
    toggleLostOrWonModal.value = stage;
    isLost.value = lost;
  }

  function handleIsComplete(stage) {
    return ((leadStage.value?.stage_id != stage?.stage_id &&
      lastStagePosition.value && stage.position <= lastStagePosition.value) || leadStage.value?.status == 'success')
  }

  function handleIsActive(stage) {
    if (handleIsComplete(stage))
      return false;
    return (leadStage.value?.stage_id == stage?.stage_id || leadStage.value?.status == 'success')
  }

  function handleIsLost(stage) {
    return (leadStage.value?.status == 'lost');
  }

  function handleIsSuccess(stage) {
    return (leadStage.value?.status == 'success');
  }

  watchEffect(() => {
    leadPrimaryStages.value?.map((item) => {
      if (item.lead_stage) {
        lastStagePosition.value = item.position;
      }
    });
  });
</script>

<template>
  <Transition>
    <action-bar class="flex-column justify-content-start align-items-start px-3">
      <div class="pipeline-progress-bar w-100 d-flex justify-content-start align-items">
        <div class="w-50 flex-grow-1">
          <CustomScrollbar :wrapper-style="{ width: '100%' }"
            :style="{ width: '100%', paddingBottom: '5px' }"
            direction="horizontal"
            thumbWidth="3.5">
            <div class="btn-group flex-grow-1 shadow-0 white-space-nowrap">
              <button v-if="!isFirstLoading"
                v-for="(stage, index) in leadPrimaryStages"
                :key="index"
                ref="progressBar"
                @click="handlePipelineStageUpdate(stage)"
                v-tippy="{ content: stage?.name, placement: 'top' }"
                class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold shadow-0"
                :class="{
                  complete:handleIsComplete(stage),
                  active: handleIsActive(stage),
                  lost: handleIsLost(stage),
                  'cursor-no-drop':(handleIsSuccess(stage) ||  handleIsLost(stage)),
                }">
                <span class="d-flex justify-content-center align-items-center"
                  v-if="isLoadingStageId == stage?.stage_id">
                  <svg-custom-icon style="width: 1rem; height: 1rem"
                    class="me-2"
                    icon="SpinnerIcon" />Processing...</span>
                <span class="text-lowercase text-overflow-ellipsis d-block"
                  v-else>{{
                  timeDifference(
                  stage?.lead_stage?.start_at,
                  stage?.lead_stage?.completed_at
                  )?.replace(
                  leadStage.stage_id == stage?.stage_id ? "1＜min" : "~",
                  "just now"
                  )
                  }}
                </span>
              </button>
              <Skeletor v-else
                v-for="(item, index) in 8"
                :key="Math.random()"
                class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold shadow-0"
                style="border-radius: 3px; line-height: normal !important"></Skeletor>
            </div>
          </CustomScrollbar>
        </div>
        <div class="btn-group ms-2 shadow-0">
          <button v-if="leadStage.status == 'lost' || leadStage.status == 'primary'"
            @click="handleToggleModal(true, true)"
            class="btn btn-sm btn-danger btn-lost py-0 fw-bold me-1">
            Lost
          </button>
          <button v-if="
              leadStage.status == 'success' || leadStage.status == 'primary'
            "
            @click="handleToggleModal(true, false)"
            class="btn btn-sm btn-success btn-won py-0 fw-bold">
            Won
          </button>

          <button @click="toggleReopenModal=true"
            v-if="leadStage.status != 'primary' && !isFirstLoading"
            class="btn btn-sm btn-secondary btn-reopen py-0 fw-bold">
            Reopen
          </button>
        </div>
      </div>
      <div v-if="!isFirstLoading"
        class="d-flex py-1 current-pipeline-stage">
        <span class="mb-0 fs-16px text-soft fw-bold me-1">{{ leadPipeline?.title }} :
        </span>
        <span class="mb-0 fs-16px text-soft">{{ leadStage?.name }}</span>
      </div>
      <div v-else>
        <Skeletor style="width: 100px; height: 0.6rem" /> :
        <Skeletor style="width: 50px; height: 0.6rem" />
      </div>
    </action-bar>
  </Transition>

  <lost-or-won-modal :is-lost="isLost"
    @close="() => (toggleLostOrWonModal = false)"
    v-if="toggleLostOrWonModal"></lost-or-won-modal>

  <lead-reopen-modal @close="() => (toggleReopenModal = false)"
    v-if="toggleReopenModal">
  </lead-reopen-modal>

</template>

<style scoped
  lang="scss">
  .btn-stage-list {
    width: auto;
  }

  .current-pipeline-stage {
    line-height: 15px;
  }

  :deep(.pipeline-progress-bar) {
    .scrollbar__content--horizontal {
      width: 100%;
    }

    .btn-group {
      .btn-stage {
        background-color: #e4e7eb;
        height: 25px;
        margin-right: 3px;
        min-width: 10rem;
        box-sizing: border-box;
        flex: 1;

        &.normal-stage {
          background-color: #e4e7eb;
        }

        &.lost-stage {
          background-color: #ff8ea1;
        }

        &.complete:not(.lost-stage) {
          background-color: #8eedc7;
          color: #091e43;
        }

        &.active:not(.lost-stage) {
          background-color: #27ab83;
          color: #ffffff;
        }

        &.lost,
        &.lost-stage.active {
          background-color: #ffb6c3 !important;
          color: #ffffff;
          cursor: no-drop;
        }
      }

      .btn-reopen,
      .btn-won,
      .btn-lost {
        height: 25px;
      }
    }
  }
</style>
<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s linear;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>