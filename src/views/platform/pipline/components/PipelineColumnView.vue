<script setup>
    import PipelineSkeletor from './PipelineSkeletor.vue';
    import ColumnStage from './ColumnStage.vue';
    import { computed, ref, onMounted } from 'vue';
    import { usePipelineStore } from '@stores';

    const pipelineStore = usePipelineStore();
    const pipelinePirimaryStages = computed(() => pipelineStore.getPipelinePrimaryStages);
    const pipelineSuccessStages = computed(() => pipelineStore.getPipelineSuccessStages);
    const pipelineLostStages = computed(() => pipelineStore.getPipelineLostStages);
    const isFirstLoading = computed(() => pipelineStore.getIsFirstLoading);

</script>
<template>
    <div class="pip-body-scrollbar"
        :style="{overflowY:'hidden' }">
        <section class="pipline d-table w-100">
            <div class="piplien-body d-flex flex-row">
                <pipeline-skeletor v-if="isFirstLoading" />
                <column-stage v-for="(stage, index) in pipelinePirimaryStages"
                    :key="stage.stage_id"
                    :stage="stage"></column-stage>
                <column-stage v-for="(stage, index) in pipelineSuccessStages"
                    :key="stage.stage_id"
                    :stage="stage"></column-stage>
                <column-stage v-for="(stage, index) in pipelineLostStages"
                    :key="stage.stage_id"
                    :stage="stage"></column-stage>

                <div class="piplien-state"
                    style="flex-grow: 1;max-width: 100%;">
                    <div class="pip-header ps-3 pe-2 py-2 d-flex flex-column">
                        <h3 class="fs-18px text-head fw-bold mb-0">&nbsp;</h3>
                        <span class="fs-12px text-head">&nbsp;</span>
                    </div>
                    <div class="py-1 value-bar">
                        <div class="px-3 d-flex justify-content-between align-items-center">
                            <span class="text-head fw-bold fs-12px">&nbsp;</span>
                            <span class="text-head fw-bold fs-12px">&nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>