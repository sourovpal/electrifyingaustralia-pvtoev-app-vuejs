<script setup>
    import { ref, onMounted,   reactive,  } from 'vue';
    import { Modal } from 'mdb-ui-kit';
    import CustomScrollbar from 'custom-vue-scrollbar';
    import SelectObject from '@views/platform/components/fields/SelectObject.vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const emits = defineEmits(['handleRefresh']);
    const modalRef = ref(null);
    const errors = ref({});
    let attributes = reactive({
        email: null,
        role: null,
        reset: 1,
    });
    const roles = ref([]);
    const isLoading = ref(false);
    let modalInstance = null;

    function showModal() {
        errors.value = {};
        attributes.name = null;
        modalInstance?.show();
    }
    function hideModal() {
        modalInstance?.hide();
    }

    async function handleCreate() {
        $toast.clear();
        errors.value = {};
        isLoading.value = true;
        await useApiRequest({
            url: '/roles',
            method: 'post',
            payload: attributes
        }).then(res => {
            const { success, message, errors: apiErrors } = res;
            if (success) {
                emits('handleRefresh', { page: 1 });
                $toast.success(message.text);
                attributes.name = null;
            } else if (!success && apiErrors) {
                errors.value = apiErrors;
            } else {
                $toast.error(message.text);
            }
        }).catch(error => {
            $toast.error("Oops, something went wrong.");
        }).finally(() => {
            isLoading.value = false;
        });
    }

    onMounted(() => {
        modalInstance = new Modal(modalRef.value);
    });

    defineExpose({
        showModal,
        hideModal
    });

</script>

<template>

    <div class="modal fade"
        ref="modalRef">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-base">New Role</h5>
                </div>
                <div class="modal-body">
                    <div class="settings-group-item">
                        <label class="form-label-title">Role Name:</label>
                        <input @click="delete errors?.name"
                            v-model="attributes.name"
                            class="form-control"
                            type="text">
                        <span class="fs-14px text-danger py-1 w-100 d-block"
                            v-if="errors?.name?.length">{{ errors?.name[0] }}</span>
                    </div>
                </div>
                <div class="modal-footer flex-between-center border-top-0">
                    <button type="button"
                        class="btn btn-danger fw-bold btn-sm"
                        data-mdb-dismiss="modal">Cancel</button>
                    <router-link class="btn btn-success"
                        v-if="attributes.role_id"
                        :to="`/settings/roles/${attributes.role_id}/edit`">Edit Role</router-link>
                    <loading-button v-else
                        class="btn-sm"
                        :is-loading="isLoading"
                        :disabled="!attributes.name"
                        @click="handleCreate"
                    >Save Change</loading-button>
                </div>
            </div>
        </div>
    </div>

</template>
