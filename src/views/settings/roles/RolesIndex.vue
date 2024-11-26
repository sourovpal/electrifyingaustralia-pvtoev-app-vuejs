<script setup>
    import RoleToolsBar from './components/RoleToolsBar.vue';
    import Datatable from './components/Datatable.vue';
    import CreateNewRoleModal from './components/CreateNewRoleModal.vue';
    import SettingsTopNavbar from "@components/SettingsTopNavbar.vue";
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

    const getAllRoles = async (page = pagination.value.current_page) => {
        if (isLoading.value) return;
        isLoading.value = true;
        await useApiRequest({
            url: '/settings/roles',
            payload: {
                page,
                limit: 30,
            }
        }).then(({ roles: _roles, pagination: _pagination }) => {

            isFirstLoading.value = false;

            selectedRows.value = [];

            roles.value = _roles;

            pagination.value = _pagination;


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

        if (index > -1) selectedRows.value.splice(index, 1);

        else selectedRows.value.push(id);
    }

    const handleSelectAllRows = (id) => {

        if (selectedRows.value.length) selectedRows.value = [];

        else selectedRows.value = roles.value.map(item => item.user_id);
    }

</script>

<template>
    <section class="content team-roles">

        <settings-top-navbar title="Roles & Access"></settings-top-navbar>

        <div class="mt-n5">

            <RoleToolsBar :is-first-loading="isFirstLoading"
                :is-loading="isLoading"
                :pagination="pagination"
                :roles="roles"
                :selected-rows="selectedRows"
                @handlePagination="getAllRoles"
                @handleSelectAllRows="handleSelectAllRows"
                @handleAddNew="addNewRoleModalRef?.showModal()">
            </RoleToolsBar>

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
<style>
    .team-roles .scrollbar__wrapper {
        height: calc(100vh - 7rem + 3px);
    }
</style>