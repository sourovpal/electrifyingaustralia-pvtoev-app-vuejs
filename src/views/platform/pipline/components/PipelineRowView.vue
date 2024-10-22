<script setup>
    import PipelineSkeletor from './PipelineSkeletor.vue';
    import RowStage from './RowStage.vue';
    import { computed, ref, onMounted } from 'vue';
    import { usePipelineStore } from '@stores';

    const pipelineStore = usePipelineStore();
    const pipelinePirimaryStages = computed(() => pipelineStore.getPipelinePrimaryStages);
    const pipelineSuccessStages = computed(() => pipelineStore.getPipelineSuccessStages);
    const pipelineLostStages = computed(() => pipelineStore.getPipelineLostStages);
    const isFirstLoading = computed(() => pipelineStore.getIsFirstLoading);
</script>

<template>
    <section class="pipline__table">
        <row-stage v-for="(stage, index) in pipelinePirimaryStages"
            :key="stage.stage_id"
            :stage="stage"></row-stage>
        <row-stage v-for="(stage, index) in pipelineSuccessStages"
            :key="stage.stage_id"
            :stage="stage"></row-stage>
        <row-stage v-for="(stage, index) in pipelineLostStages"
            :key="stage.stage_id"
            :stage="stage"></row-stage>
        <br><br><br>
    </section>
</template>

<style lang="scss"
    scoped>
    .pipline__table {
        overflow: auto;
        height: 89vh;
    }
</style>