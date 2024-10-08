<script setup>
    import { ref, onMounted } from 'vue';
    import InviteNewMemberModal from './components/InviteNewMemberModal.vue';
    import EditTeamMemberModal from './components/EditTeamMemberModal.vue';
    import Datatable from './components/Datatable.vue';
    import TeamToolsBar from './components/TeamToolsBar.vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const isFirstLoading = ref(false);
    const isLoading = ref(false);
    const teamMembers = ref([]);
    const pagination = ref({
        total: 0,
        per_page: 0,
        current_page: 1,
        next_page: null,
        prev_page: null,
        last_page: null,
        from: 0,
        to: 0
    });

    const invitedModalRef = ref(null);
    const editModalRef = ref(null);
    const editModal = ref(null);
    const selectedRows = ref([]);

    // Function to fetch member data
    const getAllMembers = async (payload = { page: pagination.value.current_page }) => {
        if (isLoading.value) return;
        isLoading.value = true;
        let url = '/users';
        payload['limit'] = 30;
        await useApiRequest({
            url,
            payload
        }).then(res => {
            const { success, message, users, pagination: paginationData } = res;
            isFirstLoading.value = false;
            if (success && users?.length > 0) {
                selectedRows.value = [];
                teamMembers.value = users;
                pagination.value = paginationData;
            } else {
                teamMembers.value = [];
            }
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        }).finally(() => {
            isLoading.value = false;
            isFirstLoading.value = false;
        });
    };

    // Fetch data on mount
    onMounted(() => {
        isFirstLoading.value = true;
        getAllMembers();
    });

    const handleSelectRows = (id) => {
        var index = selectedRows.value.indexOf(id);
        if (index > -1) {
            selectedRows.value.splice(index, 1);
        } else {
            selectedRows.value.push(id);
        }
    }

    const handleSelectAllRows = (id) => {
        if (selectedRows.value.length) {
            selectedRows.value = [];
        } else {
            selectedRows.value = teamMembers.value.map(item => item.user_id);
        }
    }
</script>

<template>
    <section class="content team-members">
        <div class="content-header d-flex justify-content-start align-stages-center my-3">
            <h1 class="mb-0 text-base">Team Members</h1>
        </div>
        <div class="content-body- border-top">
            <TeamToolsBar :is-first-loading="isFirstLoading"
                :is-loading="isLoading"
                :pagination="pagination"
                :team-members="teamMembers"
                :selected-rows="selectedRows"
                @handlePagination="getAllMembers"
                @handleSelectAllRows="handleSelectAllRows"
                @handleInvited="invitedModalRef?.showModal()"></TeamToolsBar>
            <Datatable :is-first-loading="isFirstLoading"
                :is-loading="isLoading"
                :team-members="teamMembers"
                :selected-rows="selectedRows"
                @handleRefresh="getAllMembers"
                @handleSelectRows="handleSelectRows"
                @handleEditMember="(member) => editModalRef?.showModal(member)"></Datatable>
        </div>
        <invite-new-member-modal ref="invitedModalRef"
            @handleRefresh="getAllMembers"></invite-new-member-modal>
        <edit-team-member-modal ref="editModalRef"
            @handleRefresh="getAllMembers"></edit-team-member-modal>
    </section>
</template>
<style scoped>
    .team-member-hover:hover {
        color: #2f6dd4;
    }
</style>
<style>
    .team-members .tbl-body .tbl-tr .tbl-td {
        padding-top: 2px !important;
        padding-bottom: 2px !important;
    }

    .team-members .tbl-custom-data-table {
        height: calc(100vh - 107px) !important;
    }
</style>