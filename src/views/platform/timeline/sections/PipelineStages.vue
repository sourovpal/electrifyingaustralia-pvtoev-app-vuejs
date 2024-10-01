<script setup>
    import ActionBar from "@components/ActionBar/ActionBar.vue";
    import LeftActionBar from "@components/ActionBar/LeftActionBar.vue";
    import RightActionBar from "@components/ActionBar/RightActionBar.vue";
    import { usePlatformStore } from '@stores';
    import { ref, computed } from 'vue';
    import { Skeletor } from "vue-skeletor";
    import { $toast } from '@config';
    import { useApiRequest } from '@actions/api';

    const platformStore = usePlatformStore();
    const editLead = computed(() => platformStore.getEditLead);
    const editLeadId = computed(() => platformStore.getEditLeadId);
    const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
    const isPipelineLead = computed(() => platformStore.getIsPipelineLead);
    const leadStages = computed(() => platformStore.getLeadStages);
    const leadStage = computed(() => platformStore.getLeadStage);
    const leadPipeline = computed(() => platformStore.getLeadPipeline);
    const isLoadingStageId = ref(null);

    function handlePipelineStageUpdate(stage) {
        isLoadingStageId.value = stage.stage_id;
        $toast.clear();
        var data = {
            pipeline: leadPipeline.value?.pipeline_id,
            pipeline_stage: stage.stage_id,
        };

        const res = useApiRequest({
            url: `/leads/${editLeadId.value}/move-lead`,
            method: 'post',
            payload: data,
        }).then(res => {
            const { success, message, ...args } = res;
            if (!success && args.errors) {
                $toast.error("Oops, something went wrong");
                return;
            }
            platformStore.setLeadStage(stage);
            platformStore.callFetchLeadStages(platformStore.getEditLeadId, ({ loading }) => {
                if (!loading) {
                    isLoadingStageId.value = null;
                }
            });
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        });
    }



</script>

<template>
    <Transition>
        <action-bar class="flex-column justify-content-start align-items-start px-3">
            <left-action-bar class="w-100">
                <div class="pipeline-progress-bar w-100 d-flex justify-content-between align-items">
                    <div class="btn-group shadow-0 white-space-nowrap w-100 overflow-auto">
                        <button v-if="!isFirstLoading"
                            v-for="(stage, index) in leadStages"
                            :key="index"
                            ref="progressBar"
                            @click="handlePipelineStageUpdate(stage)"
                            v-tippy="{ content: stage?.name, placement: 'top' }"
                            class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold"
                            :class="{complete:((stage?.lead_stage && leadStage.stage_id != stage?.stage_id) || stage.position < leadStage?.position ), active: leadStage.stage_id == stage?.stage_id}">

                            <span class="d-flex justify-content-center align-items-center"
                                v-if="isLoadingStageId == stage?.stage_id">
                                <svg-custom-icon style="width:1rem;height:1rem;"
                                    class="me-2"
                                    icon="SpinnerIcon" />Processing...</span>
                            <span v-else>{{ stage?.lead_stage?.start_at }}</span>

                        </button>
                        <Skeletor v-else
                            v-for="(item, index) in 5"
                            :key="Math.random()"
                            class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold"
                            style="border-radius:3px;"></Skeletor>
                    </div>
                    <div class="btn-group ms-2 shadow-0">
                        <button class="btn btn-sm btn-danger btn-lost py-0 fw-bold me-1">
                            Lost
                        </button>
                        <button class="btn btn-sm btn-success btn-won py-0 fw-bold">
                            Won
                        </button>
                    </div>
                </div>
            </left-action-bar>
            <div v-if="!isFirstLoading"
                class="d-flex py-1 current-pipeline-stage">
                <span class="mb-0 fs-16px text-soft fw-bold me-1">{{ leadPipeline?.title }} : </span>
                <span class="mb-0 fs-16px text-soft">{{ leadStage?.name }}</span>
            </div>
            <div v-else>
                <Skeletor style="width:100px;height:0.6rem;" /> :
                <Skeletor style="width:50px;height:0.6rem;" />
            </div>
        </action-bar>
    </Transition>
</template>

<style scoped
    lang="scss">
    .current-pipeline-stage {
        line-height: 15px;
    }

    .pipeline-progress-bar {
        .btn-group {
            .btn-stage {
                background-color: #e4e7eb;
                height: 25px;
                margin-right: 3px;
                min-width: 8rem;

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
                    background-color: #d1485f !important;
                    color: #ffffff;
                }
            }

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