<script setup>
    import RoleToolsBar from './components/RoleToolsBar.vue';
    import Datatable from './components/Datatable.vue';
    import CreateNewRoleModal from './components/CreateNewRoleModal.vue';
    import { ref, onMounted } from 'vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';

    const addNewRoleModalRef = ref(null);
    const isLoading = ref(false);
    const isFirstLoading = ref(false);
    const selectedRows = ref([]);
    const roles = ref([]);
    
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

    const getAllRoles = async (payload = { page: pagination.value.current_page }) => {
        if (isLoading.value) return;
        isLoading.value = true;
        let url = '/roles';
        payload['limit'] = 30;
        await useApiRequest({
            url,
            payload
        }).then(res => {
            const { success, message, roles: rolesData, pagination: paginationData } = res;
            isFirstLoading.value = false;
            if (success && rolesData?.length > 0) {
                selectedRows.value = [];
                roles.value = rolesData;
                pagination.value = paginationData;
            } else {
                roles.value = [];
            }
        }).catch(error => {
            $toast.error("Oops, something went wrong");
        }).finally(() => {
            isLoading.value = false;
            isFirstLoading.value = false;
        });
    };

    onMounted(() => {
        isFirstLoading.value = true;
        getAllRoles();
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
            selectedRows.value = roles.value.map(item => item.user_id);
        }
    }

</script>

<template>
    <section class="content team-roles">
        <div class="content-header d-flex justify-content-start align-stages-center my-3">
            <h1 class="mb-0 text-base">Roles & Access</h1>
        </div>
        <div class="content-body- border-top">

            <RoleToolsBar :is-first-loading="isFirstLoading"
                :is-loading="isLoading"
                :pagination="pagination"
                :roles="roles"
                :selected-rows="selectedRows"
                @handlePagination="getAllRoles"
                @handleSelectAllRows="handleSelectAllRows"
                @handleAddNew="addNewRoleModalRef?.showModal()"></RoleToolsBar>
            <Datatable :is-first-loading="isFirstLoading"
                :is-loading="isLoading"
                :roles="roles"
                :selected-rows="selectedRows"
                @handleRefresh="getAllRoles"
                @handleSelectRows="handleSelectRows"
                @handleEditMember="(member) => editModalRef?.showModal(member)"></Datatable>
        </div>

        <create-new-role-modal ref="addNewRoleModalRef"
            @handleRefresh="getAllRoles" />

    </section>
</template>
<style scoped>
    .team-role-hover:hover {
        color: #2f6dd4;
    }
</style>
<style>
    .team-roles .tbl-body .tbl-tr .tbl-td {
        padding-top: 2px !important;
        padding-bottom: 2px !important;
    }

    .team-roles .scrollbar__wrapper {
        height: calc(100vh - 7rem + 3px);
    }

    .team-roles .scrollbar__scroller {
        height: 100%;
    }
</style>