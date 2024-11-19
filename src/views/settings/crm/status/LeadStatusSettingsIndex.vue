<script setup>
    import Item from './components/Item.vue';
    import DeleteConfirmModal from './components/DeleteConfirmModal.vue';
    import { VueDraggableNext } from 'vue-draggable-next';
    import { useApiRequest } from '@actions';
    import { ref, onMounted } from 'vue';

    import { $toast } from '@config';

    const lead_statuses = ref([]);
    const is_loading = ref(false);
    const is_creating = ref(false);
    const toggle_confirm_modal = ref();
    const selected_status = ref(null);

    function fetchLeadStatuses() {
        is_loading.value = true;

        useApiRequest({
            url: '/settings/statuses',
        }).then(statuses => lead_statuses.value = statuses)
            .catch(error => $toast.error(error.message));
    }


    function updatePosition() {

        if (!lead_statuses.value.length) return;

        let statuses = lead_statuses.value.map(item => item.status_id);

        useApiRequest({
            url: '/settings/statuses/positlion',
            method: 'PUT',
            payload: {
                statuses: statuses,
            },
        }).then(res => {
            //
        }).catch(error => {

            $toast.error(error.message);

        });

    }

    function handleCreate() {

        is_creating.value = true;

        useApiRequest({
            url: '/settings/statuses',
            method: 'POST',
        }).then(status => {

            lead_statuses.value.push(status);

        }).catch(error => {

            $toast.error(error.message);

        }).finally(() => {

            is_creating.value = false;

        });

    }

    function handleDeleteModal(status) {
        selected_status.value = status;
        toggle_confirm_modal.value = true;
    }

    onMounted(() => {
        fetchLeadStatuses();
    });

</script>

<template>

    <div class="content content-y-100vh">

        <div class="content-header">
            <h1>Lead Statuses</h1>
        </div>

        <div class="content-body">

            <div class="row">
                <div class="col-lg-2">

                </div>
                <div class="col-lg-4 col-12">

                    <p class="mb-2 fw-bold fs-14px">Change order or name of statuses</p>

                    <div class="list-group">

                        <vue-draggable-next @change="updatePosition"
                            class="lead-status-list"
                            tag="div"
                            :list="lead_statuses"
                            handle=".handle">

                            <template v-for="(status, index) in lead_statuses"
                                :key="index">

                                <Item @delete="handleDeleteModal(status)"
                                    :status="status"></Item>

                            </template>

                        </vue-draggable-next>

                        <div class="list-group-item bg-light text-center add-new-lead-status"
                            @click="handleCreate">
                            <span v-if="is_creating">Creating...</span>
                            <span v-else>Add New</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <delete-confirm-modal :delete-status="selected_status"
        :statuses="lead_statuses"
        v-if="toggle_confirm_modal"
        v-model:visible="toggle_confirm_modal"
        @close="toggle_confirm_modal = false"
        @refresh="fetchLeadStatuses"></delete-confirm-modal>

</template>

<style lang="scss"
    scoped>
    .list-group {
        :deep(.list-group-item:first-child) {
            border-top-left-radius: 3px !important;

            .p-inputtext {
                border-top-left-radius: 3px !important;
                border-top-right-radius: 3px !important;
            }
        }
    }

    .add-new-lead-status {
        font-size: 16px;
        padding: 7.21px 8px;
        cursor: pointer;
        border-bottom-left-radius: 3px !important;
        border-bottom-right-radius: 3px !important;

        &:hover {
            color: var(--crm-color);
            border-color: #bfdbfe;
            background-color: rgba(239, 246, 255, 0.95) !important;
        }
    }
</style>