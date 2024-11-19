import { defineStore } from 'pinia';
import { useApiRequest } from '@actions';
import { validateObject } from "@helpers";

export const usePipelineStore = defineStore('pipeline', {
    state: () => {
        return {
            isError: false,
            filterQuerys: {},
            searchQuery: null,
            isLoading: false,
            isFirstLoading: false,
            toggleFilter: false,
            pipelineView: 'column',
            pipelineId: '',
            pipeline: {},
            pipelinePrimaryStages: [],
            pipelineSuccessStages: [],
            pipelineLostStages: [],
            orderBy: 'DESC',
            orderColumn: 'updated_at',
        }
    },
    getters: {
        getError(payload) {
            this.isError = payload;
        },
        getPipelineView(stage) {
            return stage.pipelineView;
        },
        getOrderBy(stage) {
            return stage.orderBy;
        },
        getOrderColumn(stage) {
            return stage.orderColumn;
        },
        getToggleFilter(stage) {
            return stage.toggleFilter;
        },
        getFilterQuerys(stage) {
            return stage.filterQuerys;
        },
        getSearchQuery(stage) {
            return stage.searchQuery;
        },
        getPipelineId(stage) {
            return stage.pipelineId;
        },
        getPipeline(stage) {
            return stage.pipeline;
        },
        getIsFirstLoading(stage) {
            return stage.isFirstLoading;
        },
        getIsLoading(stage) {
            return stage.isLoading;
        },
        getPipelinePrimaryStages(stage) {
            return stage.pipelinePrimaryStages;
        },
        getPipelineSuccessStages(stage) {
            return stage.pipelineSuccessStages;
        },
        getPipelineLostStages(stage) {
            return stage.pipelineLostStages;
        },
    },
    actions: {
        setIsFirstLoading(payload) {
            this.isFirstLoading = !!payload;
        },
        setIsLoading(payload) {
            this.isLoading = !!payload;
        },
        setOrderBy(payload = 'DESC') {
            return this.orderBy = payload;
        },
        setOrderColumn(payload = 'updated_at') {
            return this.orderColumn = payload;
        },
        setPipelineId(payload) {
            this.pipelineId = payload;
        },
        setPipelineView(payload = 'column') {
            this.pipelineView = payload;
        },
        setPipeline(payload) {
            if (validateObject(payload)) {
                return this.pipeline = payload;
            }
        },
        setError(payload) {
            this.isError = payload;
        },
        setSearchQuery(payload) {
            this.searchQuery = payload;
        },
        setFilterQuerys(payload = {}) {
            if (validateObject(payload)) {
                this.filterQuerys = payload;
            }
        },
        setPipelinePrimaryStages(payload) {
            if (Array.isArray(payload)) {
                return this.pipelinePrimaryStages = payload;
            }
        },
        setPipelineSuccessStages(payload) {
            if (Array.isArray(payload)) {
                return this.pipelineSuccessStages = payload;
            }
        },
        setPipelineLostStages(payload) {
            if (Array.isArray(payload)) {
                return this.pipelineLostStages = payload;
            }
        },
        setToggleFilter(payload) {
            this.toggleFilter = payload;
        },
        callFetchPipeline($pipelineId) {
            this.setIsLoading(true);
            this.setError(false);
            let url = `/pipelines/first`;
            if ($pipelineId) {
                url += `?pipeline_id=${$pipelineId}`;
            }
            useApiRequest({
                url,
            }).then(res => {
                const { success, message, pipeline } = res;
                this.setIsLoading(false);
                if (success && pipeline) {
                    const { success_stages, primary_stages, lost_stages } = pipeline;
                    this.setPipelineId(pipeline.pipeline_id)
                    this.setPipeline(pipeline);
                    this.setPipelinePrimaryStages([])
                    this.setPipelinePrimaryStages(primary_stages)
                    this.setPipelineSuccessStages([])
                    this.setPipelineSuccessStages(success_stages)
                    this.setPipelineLostStages([])
                    this.setPipelineLostStages(lost_stages)
                } else if (!success) {
                    this.setError(true);
                }
            }).catch(error => {
                this.setError(true);
            }).finally(() => {
                this.setIsFirstLoading(false);
                this.setIsLoading(false);
            });
        },
        callFetchStageLeads($stageId, $callback = () => { }) {
            $callback({
                loading: true,
            });
            useApiRequest({
                url: `/leads/${this.pipelineId}/pipeline/${$stageId}/stages`,
            }).then(res => {
                const { success, message, leads } = res;
                if (success) {
                    $callback({
                        loading: false,
                        success: true,
                        message: message,
                        leads: leads,
                    });
                } else {
                    $callback({
                        loading: false,
                        message: message,
                        success: false,
                    });
                }
            }).catch(error => {
                $callback({
                    loading: false,
                    error: false,
                    message: error,
                });
            });
        }
    }

});
