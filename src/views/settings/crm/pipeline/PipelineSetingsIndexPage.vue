<script setup>
    import DealPipelinesSkeletor from './components/DealPipelinesSkeletor.vue';
    import DealPipelines from './components/DealPipelines.vue';
    import SettingsTopNavbar from '@components/SettingsTopNavbar.vue';
    import PipelineDeleteConfirmModal from './components/PipelineDeleteConfirmModal.vue';

    import { ref, onMounted } from 'vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const pipelines = ref([{ id: null, title: 'Example Pipeline', total_stages: 0, created_ago: '1 seconds ago', total_properties: 1 }]);
    const is_loading = ref(false);
    const is_first_loading = ref(false);
    const isSubmitPipelineUpdate = ref(false);
    const toggle_delete_modal = ref(false);
    const delete_pipeline = ref(null);

    const handlePosition = (action, index, item) => {

        let i;

        if (action === 'up') i = index - 1;
        else i = index + 1;

        const prev = pipelines.value[i];

        if (!prev) return;

        pipelines.value[i] = item;
        pipelines.value[index] = prev;

        handleUpdatePosition();

    };

    const handleUpdatePosition = async () => {

        let pipelines_id = pipelines.value?.map(item => item.pipeline_id);

        await useApiRequest({
            url: '/settings/pipelines/position',
            method: 'PUT',
            payload: {
                pipelines: pipelines_id
            },
        }).then(res => {
        }).catch(error => {
            $toast.error(error.message.text);
        });

    };

    const fetchAllPipeline = async () => {

        $toast.clear();

        is_loading.value = true;

        const res = await useApiRequest({
            url: '/settings/pipelines',
        }).then(results => {
            pipelines.value = results;
        }).catch(error => {
            $toast.error(error.message.text);
        }).finally(() => {
            is_first_loading.value = false;
            is_loading.value = false;
        });

    };

    onMounted(() => {
        is_first_loading.value = true;
        fetchAllPipeline();
    });

    function handleDeleteConfirmModal(pipeline) {
        delete_pipeline.value = pipeline;
        toggle_delete_modal.value = true;
    }

</script>

<template>
    <div class="content content-y-100vh">

        <settings-top-navbar title="Pipelines"></settings-top-navbar>

        <div class="content-body">

            <div class="row">

                <div class="col-lg-3 col-12 mb-3 mb-lg-0">
                    <div class="settings-group-header">
                        <h2>Pipeline & Stages</h2>
                    </div>
                    <div class="fs-12px text-soft">
                        Pipeline & Stages represent the sales process, divided into steps like Prospecting, Negotiation,
                        and Closing, providing a clear path to track and manage deals efficiently.
                    </div>
                </div>

                <div class="col-lg-8  col-xl-4 col-12">

                    <deal-pipelines-skeletor v-if="is_first_loading"></deal-pipelines-skeletor>

                    <template v-else>

                        <deal-pipelines v-for="(pipeline, index) in pipelines"
                            :pipeline="pipeline"
                            :position="index"
                            :total="pipelines.length"
                            :key="index"
                            @handleDelete="handleDeleteConfirmModal(pipeline)"
                            @changePosition="(action)=>handlePosition(action, index, pipeline)"></deal-pipelines>

                    </template>

                    <div class="mt-3">
                        <router-link to="/settings/crm/pipeline/create"
                            class="btn btn-primary fw-bold">Add new pipeline</router-link>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <pipeline-delete-confirm-modal v-if="toggle_delete_modal"
        :pipelines="pipelines"
        :delete-pipeline="delete_pipeline"
        v-model:visible="toggle_delete_modal"
        @refresh="fetchAllPipeline"
        @close="toggle_delete_modal = false"></pipeline-delete-confirm-modal>


</template>