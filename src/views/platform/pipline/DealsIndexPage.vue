<script setup>
    import './style.scss';
    import { ref, onMounted, computed, watch } from 'vue';
    import SearchBar from '@components/SearchBar.vue';
    import FilterRightSidebar from './components/FilterRightSidebar.vue';
    import PipelineStateLeadDetails from './components/PipelineStateLeadDetails.vue';
    import LoadingStateLeads from './components/LoadingStateLeads.vue';
    import PipelineColumnView from './components/PipelineColumnView.vue';
    import PipelineRowView from './components/PipelineRowView.vue';
    import PipelineToolsBar from './components/PipelineToolsBar.vue';
    import { Skeletor } from 'vue-skeletor';
    import { usePipelineStore } from '@stores';
    import { useRouter, useRoute } from 'vue-router';

    const pipelineStore = usePipelineStore();
    const router = useRouter();
    const route = useRoute();
    const pipelineView = computed(() => pipelineStore.getPipelineView);

    const pipelineId = computed(() => {
        let id = route.query.pipeline;
        pipelineStore.callFetchPipeline(id ?? null);
        if (id) {
            pipelineStore.setPipelineId(id);
            return id;
        }
        return null;
    });

    watch(pipelineId, ({ id }) => { });

    onMounted(() => {
        pipelineStore.setIsFirstLoading(true);
    });

</script>
<template>
    <section class="content pipline-list">
        <search-bar></search-bar>
        <pipeline-tools-bar></pipeline-tools-bar>
        <filter-right-sidebar></filter-right-sidebar>
        <pipeline-column-view v-if="pipelineView == 'column'"></pipeline-column-view>
        <pipeline-row-view v-else></pipeline-row-view>
    </section>
</template>
<style lang="scss">
    .pipline-list .piplien-body,
    .pipline-list .pip-body-scrollbar {
        height: calc(100vh - 102px) !important;
    }    
</style>