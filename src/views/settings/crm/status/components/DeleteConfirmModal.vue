<style scoped
    lang="scss">

</style>
<template>
    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal
        pt:header:class="py-2"
        header="Delete Status"
        :style="{ width: '25rem' }">

        <div class="mb-3">

            <label class="fs-16px mb-1">Selected status</label>

            <icon-field>

                <input-text size="small"
                    v-model="deleteStatus.name"
                    :readonly="true"
                    class="w-100 fs-16px"></input-text>

                <input-icon class="pi pi-times fs-14px text-danger" />

            </icon-field>

        </div>

        <div class="mb-3">
            <label class="fs-16px mb-1">Replace leads status</label>

            <select-option filter
                v-model="replace_status"
                :options="lead_statuses"
                :filterFields="['name']"
                optionLabel="name"
                placeholder="Select a status"
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
                :disabled="!replace_status && lead_statuses.length"
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
        deleteStatus: { type: Object, default: {} },
        statuses: { type: Array, default: [] }
    });

    const emits = defineEmits(['close', 'refresh']);

    const statuses = computed(() => props.statuses);

    const lead_statuses = ref([]);
    const replace_status = ref(null);
    const is_deleting = ref(false);

    watch(
        statuses,
        () => lead_statuses.value = statuses.value.filter(item => item.status_id != props.deleteStatus?.status_id),
        { deep: true, immediate: true }
    );

    function handleDelete() {

        if (!props.deleteStatus) return;

        is_deleting.value = true;

        useApiRequest({
            url: '/settings/statuses',
            method: 'DELETE',
            payload: {
                status_id: props.deleteStatus.status_id,
                replace_id: replace_status.value?.status_id,
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


</script>