<script setup>
  import { ref, onMounted, watch } from "vue";
  import EditTeamMemberModal from "./components/EditTeamMemberModal.vue";
  import Datatable from "./components/Datatable.vue";
  import TeamToolsBar from "./components/TeamToolsBar.vue";
  import SettingsTopNavbar from "@components/SettingsTopNavbar.vue";
  import { useApiRequest } from "@actions";
  import { $toast } from "@config";

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
    to: 0,
  });

  const toggle_edit_modal = ref(false);
  const edit_team_member = ref(null);
  const selectedRows = ref([]);

  function handleToggleModal(member = null) {

    toggle_edit_modal.value = !!member;

    edit_team_member.value = member;

  }

  const getAllMembers = async (page = (pagination.value?.current_page ?? 1)) => {

    if (isLoading.value) return;

    isLoading.value = true;

    await useApiRequest({
      url: "/settings/users",
      payload: {
        page,
        limit: 30
      },
    }).then((res) => {

      const { users, pagination: _pagination } = res;
      selectedRows.value = [];
      teamMembers.value = users;
      pagination.value = _pagination;

    }).catch((error) => {
      $toast.error(error.message.text);
    }).finally(_ => {
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

    if (index > -1) selectedRows.value.splice(index, 1);

    else selectedRows.value.push(id);
  };

  const handleSelectAllRows = (id) => {

    if (selectedRows.value.length) selectedRows.value = [];

    else selectedRows.value = teamMembers.value.map((item) => item.user_id);

  };
</script>

<template>
  <section class="content team-members">

    <settings-top-navbar title="Team Members"></settings-top-navbar>

    <div class="mt-n5 ">

      <TeamToolsBar :is-first-loading="isFirstLoading"
        :is-loading="isLoading"
        :pagination="pagination"
        :team-members="teamMembers"
        :selected-rows="selectedRows"
        @handlePagination="getAllMembers"
        @handleSelectAllRows="handleSelectAllRows"></TeamToolsBar>

      <Datatable :is-first-loading="isFirstLoading"
        :is-loading="isLoading"
        :team-members="teamMembers"
        :selected-rows="selectedRows"
        @handleRefresh="getAllMembers"
        @handleSelectRows="handleSelectRows"
        @edit="handleToggleModal"></Datatable>

    </div>

    <edit-team-member-modal v-if="toggle_edit_modal"
      v-model:visible="toggle_edit_modal"
      @close="handleToggleModal()"
      :team-member="edit_team_member"
      @refresh="getAllMembers"></edit-team-member-modal>

  </section>
</template>
<style scoped>
  .team-members:deep(.tbl-custom-data-table) {
    height: calc(100vh - 107px) !important;
  }
</style>