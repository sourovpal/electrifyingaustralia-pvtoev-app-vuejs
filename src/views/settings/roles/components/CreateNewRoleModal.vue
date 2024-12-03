<script setup>
    import { ref, onMounted, reactive, } from 'vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const emits = defineEmits(['refresh', 'close']);


    let attributes = reactive({
        name: null,
    });

    const errors = ref({});
    const is_loading = ref(false);

    async function handleCreate() {

        $toast.clear();

        errors.value = {};

        is_loading.value = true;

        await useApiRequest({
            url: '/settings/roles',
            method: 'post',
            payload: {
                name: attributes.name
            }
        }).then(res => {

            const { success, message, role_id, errors: _errors } = res;

            if (_errors) return errors.value = _errors;

            attributes.name = null;
            
            emits('refresh', 1);
            
            $toast.success(message.text);

            if (role_id) attributes['role_id'] = role_id;


        }).catch(error => {
            $toast.error(error.message.text);
        }).finally(() => {
            is_loading.value = false;
        });
    }

</script>

<template>

    <modal-dialog v-bind="$attrs"
        style="border-radius:6px;"
        modal dismissableMask 
        pt:header:class="pt-1 pb-2 ps-3 pe-2"
        pt:content:class="pt-1 pb-2 ps-3"
        :header="`Add New Role`"
        :style="{ width: '30rem' }">

        <div class="">

            <label class="mb-1 fs-16px text-head">Role Name:</label>

            <input-text size="small"
                placeholder="Role name"
                v-model="attributes['name']"
                class="w-100"
                @click="delete errors.name"></input-text>

            <span class="fs-14px text-danger py-1 w-100 d-block"
                v-if="errors?.name?.length">{{ errors?.name[0] }}</span>

        </div>

        <div class="d-flex justify-content-between align-items-center pt-3">

            <Button size="small"
                type="button"
                label="Cancel"
                severity="secondary"
                @click="emits('close', true)"></Button>

            <Button size="small"
                type="button"
                :loading="is_loading"
                :disabled="!attributes.name"
                severity="success"
                @click="handleCreate"
                label="Save Change"></Button>

        </div>

    </modal-dialog>

</template>