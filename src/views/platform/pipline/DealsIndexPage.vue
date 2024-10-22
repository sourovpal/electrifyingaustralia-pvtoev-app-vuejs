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
    import EmptyPage from '@components/Errors/EmptyPage.vue';
    import ErrorPage from '@components/Errors/ErrorPage.vue';

    const pipelineStore = usePipelineStore();
    const router = useRouter();
    const route = useRoute();
    const pipelineView = computed(() => pipelineStore.getPipelineView);
    const toggleFilter = computed(() => pipelineStore.getToggleFilter);
    const pipelinePirimaryStages = computed(() => pipelineStore.getPipelinePrimaryStages);
    const pipelineSuccessStages = computed(() => pipelineStore.getPipelineSuccessStages);
    const pipelineLostStages = computed(() => pipelineStore.getPipelineLostStages);
    const isLoading = computed(() => pipelineStore.getIsLoading);
    const isError = computed(() => pipelineStore.getError);

    const pipelineId = computed(() => {
        let id = route.query.pipeline;
        pipelineStore.callFetchPipeline(id ?? null);
        pipelineStore.setIsFirstLoading(true);
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
        <empty-page
            v-if="!isLoading && !isError && !pipelinePirimaryStages?.length && !pipelineSuccessStages?.length && !pipelineLostStages?.length"
            :css="{icon:{width:'30%'}}"></empty-page>
        <error-page v-else-if="!isLoading && isError" :css="{icon:{width:'30%'}}"></error-page>
        <section v-else>
            <filter-right-sidebar v-if="toggleFilter != 'render'"></filter-right-sidebar>
            <pipeline-column-view v-if="pipelineView == 'column' || isLoading"></pipeline-column-view>
            <pipeline-row-view v-else></pipeline-row-view>
        </section>
    </section>
</template>
<style lang="scss">
    .pipline-list .piplien-body,
    .pipline-list .pip-body-scrollbar {
        height: calc(100vh - 102px) !important;
    }
</style>