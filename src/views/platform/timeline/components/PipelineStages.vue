<script setup>
  import { usePlatformStore } from "@stores";
  import { timeDifference } from "@helpers";
  import { ref, computed, watchEffect } from "vue";
  import { Skeletor } from "vue-skeletor";
  import { $toast } from "@config";
  import { useApiRequest } from "@actions";

  const platformStore = usePlatformStore();
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
  const leadPrimaryStages = computed(() => platformStore.getLeadPrimaryStages);
  const leadStage = computed(() => platformStore.getLeadStage);
  const leadPipeline = computed(() => platformStore.getLeadPipeline);
  const isLoadingStageId = ref(null);
  const lastStagePosition = ref(null);

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

        if (!success && args.errors)
          return $toast.error(message.text);

        platformStore.callFetchTimelineLogs();
        platformStore.setLeadStage(stage);

        platformStore.callFetchLeadStages(
          platformStore.getEditLeadId,
          ({ loading }) => {

            if (!loading)
              isLoadingStageId.value = null;

          }
        );

      })
      .catch((error) => {
        $toast.error(error.message);
      });
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

      if (item.lead_stage)
        lastStagePosition.value = item.position;

    });

  });
</script>

<template>
  <div class="w-100 px-3">

    <div class="pipeline-progress-bar d-flex justify-content-start align-items">


      <scroll-panel :dt="{bar: {background: '#aaaaaa',size:'0.2rem'}}"
        :style="{ width:'92%', height: '1.8rem' }">

        <div class="btn-group shadow-0 white-space-nowrap w-100">

          <template v-if="!isFirstLoading">

            <button v-for="(stage, index) in leadPrimaryStages"
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
                  }"
              :style="`--background-color:${stage?.color};`">

              <span class="d-flex justify-content-center align-items-center"
                v-if="isLoadingStageId == stage?.stage_id">

                <svg-custom-icon style="width: 1rem; height: 1rem"
                  class="me-2"
                  icon="SpinnerIcon" />
                Processing...

              </span>

              <span v-else
                class="text-lowercase text-overflow-ellipsis d-block">
                {{ timeDifference(
                stage?.lead_stage?.start_at,
                stage?.lead_stage?.completed_at
                )?.replace( leadStage.stage_id == stage?.stage_id ? "1＜min" : "~", "just now")
                }}

              </span>

            </button>
          </template>

          <Skeletor v-else
            v-for="(item, index) in 8"
            :key="Math.random()"
            class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold shadow-0"
            style="border-radius: 3px; line-height: normal !important"></Skeletor>

        </div>

      </scroll-panel>


      <div class="btn-group ms-2 shadow-0 flex-grow-1">

        <button v-if="leadStage.status == 'primary'"
          @click="platformStore.setCertifyModalAction('lost')"
          class="btn btn-sm btn-danger btn-lost me-1 d-flex justify-content-center align-items-center">
          Lost
        </button>

        <button v-if="leadStage.status == 'primary'"
          @click="platformStore.setCertifyModalAction('success')"
          class="btn btn-sm crm-btn btn-won d-flex justify-content-center align-items-center">
          Won
        </button>

        <button @click="platformStore.setCertifyModalAction('reopen')"
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

  </div>


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

        &.lost-stage {
          background-color: #ff8ea1;
        }

        &.complete:not(.lost-stage) {
          background-color: #8eedc7;
          color: #091e43;
        }

        &.active:not(.lost-stage) {
          background-color: var(--crm-color);
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