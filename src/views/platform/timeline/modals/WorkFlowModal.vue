<script setup>
    import { Modal } from "mdb-ui-kit";
    import { ref, onMounted, watch, computed, defineExpose } from 'vue';
    import { useLeadStore } from "@stores";
    import { $toast } from '@config';
    import { useApiRequest } from '@actions';
    import WorkflowTasks from './sections/WorkflowTasks.vue';

    const leadStore = useLeadStore();
    const workflowModalRef = ref(null);
    const modalInstance = ref(null);
    const taskWorkflows = ref([]);
    const isLoading = ref(false);

    onMounted(() => {
        modalInstance.value = new Modal(workflowModalRef.value);
    });

    async function showModalHandler() {
        $toast.clear();
        isLoading.value = true;
        modalInstance.value.show();
        await useApiRequest({
            url: `/platform/${leadStore.getEditLeadId}/workflows`,
        }).then(res => {
            const { success, workflows, message } = res;
            if (success) {
                taskWorkflows.value = workflows;
                return;
            }
            $toast.error(message.text);
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        }).finally(() => {
            isLoading.value = false;
        });
    }

    function hideModalHandler() {
        modalInstance.value.hide();
    }

    defineExpose({
        showModalHandler,
        hideModalHandler
    });

</script>

<template>
    <div class="modal fade"
        ref="workflowModalRef">
        <div class="modal-dialog modal-dialog-centered- modal-md mx-auto"
            style="max-width: 420px">
            <div class="modal-content">
                <div class="modal-header py-2">
                    <div class="d-flex justify-content-center align-items-center py-0">
                        <font-awesome-icon icon="fas fa-list-check"
                            class="text-head fs-16px me-2"></font-awesome-icon>
                        <span class="text-head fw-bold fs-16px">Choose workflow</span>
                    </div>
                    <div>
                        <button class="btn btn-light btn-sm btn-floating"
                            @click="hideModalHandler()">
                            <font-awesome-icon icon="fas fa-close"
                                class="text-soft fs-14px"></font-awesome-icon>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center align-items-center"
                        v-if="isLoading">
                        <svg-custom-icon icon="SpinnerIcon" /> Loading...
                    </div>
                    <workflow-tasks v-else
                        v-for="(workflow, index) in taskWorkflows"
                        :key="index"
                        :workflow="workflow"></workflow-tasks>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modal-body {
        max-height: 650px;
        overflow: auto;
    }
</style>