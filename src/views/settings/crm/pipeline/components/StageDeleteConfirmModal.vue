<style scoped
    lang="scss">

</style>
<template>
    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal
        pt:header:class="py-2"
        header="Delete Stage"
        :style="{ width: '25rem' }">

        <div class="mb-3">

            <label class="fs-16px mb-1">Selected stage</label>

            <icon-field>

                <input-text size="small"
                    v-model="deleteStage.name"
                    :readonly="true"
                    class="w-100 fs-16px"></input-text>

                <input-icon class="pi pi-times fs-14px text-danger" />

            </icon-field>

        </div>

        <div class="mb-3">
            <label class="fs-16px mb-1">Replace leads stage</label>

            <select-option filter
                v-model="replace_stage"
                :options="pipeline_stages"
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
                :disabled="!replace_stage && pipeline_stages.length"
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
        deleteStage: { type: Object, default: {} },
        stages: { type: Array, default: [] },
        pipeline: { type: Object, default: {} }
    });

    const emits = defineEmits(['close', 'refresh']);

    const stages = computed(() => props.stages);

    const pipeline_stages = ref([]);
    const replace_stage = ref(null);
    const is_deleting = ref(false);

    watch(
        stages,
        () => pipeline_stages.value = stages.value.filter(item => item.stage_id != props.deleteStage?.stage_id),
        { deep: true, immediate: true }
    );

    function handleDelete() {

        if (!props.deleteStage) return;

        is_deleting.value = true;

        useApiRequest({
            url: '/settings/stages',
            method: 'DELETE',
            payload: {
                pipeline_id: props.pipeline.pipeline_id,
                stage_id: props.deleteStage.stage_id,
                replace_id: replace_stage.value?.stage_id,
            },
        }).then(async res => {

            $toast.success(res.message.text);
            await delay(1000);

            emits('refresh');
            emits('close');

        }).catch(error => {

            $toast.error(error.message);

        }).finally(() => {

            is_deleting.value = false;

        });

    }


</script>