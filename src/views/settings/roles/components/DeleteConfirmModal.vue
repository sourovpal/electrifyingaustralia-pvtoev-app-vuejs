<style scoped
    lang="scss">

</style>
<template>
    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal
        pt:header:class="py-2"
        header="Delete Roles"
        :style="{ width: '25rem' }">

        <div class="mb-3">

            <label class="fs-16px mb-1">Selected Roles</label>

            <template v-if="is_roles_loading"
                v-for="(_, index) in selectedRows"
                :key="index">

                <icon-field class="mb-2">
                    <input-text size="small"
                        placeholder="Select role"
                        :readonly="true"
                        class="w-100 fs-16px">
                    </input-text>
                    <input-icon class="pi pi-times fs-14px text-danger" />
                </icon-field>

            </template>

            <template v-for="(delete_role, index) in delete_roles"
                :key="index">

                <icon-field class="mb-2">

                    <input-text size="small"
                        v-model="delete_role['name']"
                        :readonly="true"
                        class="w-100 fs-16px"></input-text>

                    <input-icon @click="emits('removeRow', delete_role['role_id'])"
                        class="pi pi-times fs-14px text-danger cursor-pointer" />

                </icon-field>

            </template>

        </div>

        <div class="mb-3">
            <label class="fs-16px mb-1">Replace user role</label>

            <select-option filter
                :loading="is_roles_loading"
                v-model="replace_role"
                :options="all_roles"
                :filterFields="['name']"
                optionLabel="name"
                placeholder="Select a role"
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
                :disabled="!replace_role && all_roles.length"
                label="Delete"
                @click="handleDelete"></Button>

        </div>

    </modal-dialog>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from "vue";
    import { useApiRequest } from '@actions';
    import { delay } from '@helpers';
    import { $toast } from '@config';

    const props = defineProps({
        selectedRows: { type: Array, default: [] },
    });

    const emits = defineEmits(['close', 'refresh', 'removeRow']);

    const roles = ref([]);

    const delete_roles = ref([]);
    const all_roles = ref([]);

    const replace_role = ref(null);
    const is_deleting = ref(false);
    const is_roles_loading = ref(false);

    watch(
        () => [roles.value, props.selectedRows],
        () => {

            all_roles.value = roles.value.filter(item => !props.selectedRows.includes(item.role_id));

            delete_roles.value = roles.value.filter(item => props.selectedRows.includes(item.role_id));

            if (!delete_roles.value.length) emits('close');

        },
        { deep: true }
    );

    function handleDelete() {

        is_deleting.value = true;

        useApiRequest({
            url: '/settings/roles',
            method: 'DELETE',
            payload: {
                roles: props.selectedRows,
                replace_id: replace_role.value?.role_id,
            },
        }).then(async res => {

            $toast.success(res.message.text);

            emits('refresh');

            emits('close');

        }).catch(error => {

            $toast.error(error.message.text);

        }).finally(() => {

            is_deleting.value = false;

        });

    }

    function handleFetchRoleList() {

        is_roles_loading.value = true;

        useApiRequest({
            url: '/settings/roles/list',
            method: 'get',
        }).then(_roles => {

            roles.value = _roles;

        }).catch(error => {

            $toast.error(error.message.text);

        }).finally(() => {

            is_roles_loading.value = false;

        });

    }

    onMounted(() => handleFetchRoleList());

</script>