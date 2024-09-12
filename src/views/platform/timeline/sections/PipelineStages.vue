<script setup>
    import ActionBar from "@components/ActionBar/ActionBar.vue";
    import LeftActionBar from "@components/ActionBar/LeftActionBar.vue";
    import RightActionBar from "@components/ActionBar/RightActionBar.vue";
    import { useLeadStore } from '@stores';
    import { ref, computed } from 'vue';

    const leadStore = useLeadStore();
    const editLead = computed(() => leadStore.getEditLead);
    const isPipelineLead = computed(() => leadStore.getIsPipelineLead);
    const leadStages = computed(() => leadStore.getLeadStages);
    const leadStage = computed(() => leadStore.getLeadStage);
    const leadPipeline = computed(() => leadStore.getLeadPipeline);

</script>

<template>
    <Transition>
        <action-bar class="flex-column justify-content-start align-items-start px-3">
            <left-action-bar class="w-100">
                <div class="pipeline-progress-bar w-100 d-flex justify-content-between align-items">
                    <div class="btn-group shadow-0 white-space-nowrap w-100 overflow-auto">
                        <button v-for="(stage, index) in leadStages"
                            :key="index"
                            ref="progressBar"
                            @click="updateLeadStageByProgressBar(leadPipeline.pipeline_id, stage?.stage_id)"
                            v-tippy="{ content: stage?.name, placement: 'top' }"
                            class="btn btn-sm btn-stage flex-grow-1 py-0 fw-bold"
                            :class="{complete:((stage?.lead_stage && leadStage.stage_id != stage?.stage_id) || stage.position < leadStage?.position ), active: leadStage.stage_id == stage?.stage_id}">
                            {{ stage?.lead_stage?.start_at }}
                        </button>
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
            <div class="d-flex py-1 current-pipeline-stage">
                <span class="mb-0 fs-16px text-soft fw-bold me-1">{{ leadPipeline?.title }}:</span>
                <span class="mb-0 fs-16px text-soft">{{ leadStage?.name }}</span>
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