<style scoped
    lang="scss">

</style>
<template>
    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal
        pt:header:class="py-2"
        header="Delete Pipeline"
        :style="{ width: '25rem' }">

        <div class="mb-3">

            <label class="fs-16px mb-1">Selected Pipeline</label>

            <icon-field>

                <input-text size="small"
                    v-model="deletePipeline.title"
                    :readonly="true"
                    class="w-100 fs-16px"></input-text>

                <input-icon class="pi pi-times fs-14px text-danger" />

            </icon-field>

        </div>

        <div class="mb-3">
            <label class="fs-16px mb-1">Replace leads pipeline</label>

            <select-option filter
                v-model="replace_pipeline"
                :options="lead_pipelines"
                :filterFields="['title']"
                optionLabel="title"
                @change="fetchPipelineStage"
                placeholder="Select a pipeline"
                class="w-100 select-option-small"
                panel-class="panel-option-small">

                <template #value="slotProps">

                    <div v-if="slotProps.value"
                        class="flex items-center">
                        <div>{{ slotProps.value.title }}</div>
                    </div>

                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>

                </template>

                <template #option="slotProps">

                    <div class="flex items-center">
                        <div>{{ slotProps.option.title }}</div>
                    </div>

                </template>

                <template #dropdownicon>
                    <i class="pi pi-check fs-14px text-success" />
                </template>

            </select-option>

        </div>


        <div class="mb-3">
            <label class="fs-16px mb-1">Replace leads stage</label>

            <select-option filter
                :disabled="!replace_pipeline"
                v-model="replace_stage"
                :options="pipeline_stages"
                :loading="is_loading_stage"
                :filterFields="['name']"
                optionLabel="name"
                placeholder="Select a stage"
                class="w-100 select-option-small"
                panel-class="panel-option-small">

                <template #value="slotProps">

                    <div v-if="slotProps.value"
                        class="flex items-center">
                        <div>{{ slotProps.value.name }}</div>
                    </div>

                    <span v-else>
                        {{ slotProps.placeholder }}
                    </span>

                </template>

                <template #option="slotProps">

                    <div class="flex items-center">
                        <div>{{ slotProps.option.name }}</div>
                    </div>

                </template>

                <template #dropdownicon>
                    <i class="pi pi-check fs-14px text-success" />
                </template>

            </select-option>

        </div>

        <div class="d-flex justify-content-between align-items-center mt-3">

            <Button size="small"
                type="button"
                label="Cancel"
                severity="secondary"
                @click="emits('close', true)"></Button>

            <Button size="small"
                type="button"
                severity="danger"
                :disabled="!replace_pipeline && lead_pipelines.length"
                label="Delete"
                @click="handleDelete"></Button>

        </div>

    </modal-dialog>
</template>

<script setup>
    import { ref, computed, watch } from "vue";
    import { useApiRequest } from '@actions';
    import { delay } from '@helpers';
    import { $toast } from '@config';

    const props = defineProps({
        deletePipeline: { type: Object, default: {} },
        pipelines: { type: Array, default: [] }
    });

    const emits = defineEmits(['close', 'refresh']);

    const pipelines = computed(() => props.pipelines);

    const lead_pipelines = ref([]);
    const pipeline_stages = ref([]);
    const replace_pipeline = ref(null);
    const replace_stage = ref(null);
    const is_deleting = ref(false);
    const is_loading_stage = ref(false);

    watch(
        pipelines,
        () => lead_pipelines.value = pipelines.value.filter(item => item.pipeline_id != props.deletePipeline?.pipeline_id),
        { deep: true, immediate: true }
    );

    function handleDelete() {

        if (!props.deletePipeline) return;

        is_deleting.value = true;

        useApiRequest({
            url: '/settings/pipelines',
            method: 'DELETE',
            payload: {
                pipeline_id: props.deletePipeline.pipeline_id,
                replace_id: replace_pipeline.value?.pipeline_id,
                stage_id: replace_stage.value?.stage_id,
            },
        }).then(async res => {

            $toast.success(res.message.text);
            await delay(1000);

            emits('refresh');
            emits('close');

        }).catch(error => {

            $toast.error(error.message.text);

        }).finally(() => {

            is_deleting.value = false;

        });

    }

    function fetchPipelineStage() {

        is_loading_stage.value = true;
        replace_stage.value = null;

        useApiRequest({
            url: '/settings/stages',
            payload: {
                pipeline_id: replace_pipeline.value.pipeline_id,
            },
        }).then(stages => {
            pipeline_stages.value = stages;
        }).catch(error => {

            $toast.error(error.message.text);

        }).finally(() => {

            is_loading_stage.value = false;

        });
    }


</script>