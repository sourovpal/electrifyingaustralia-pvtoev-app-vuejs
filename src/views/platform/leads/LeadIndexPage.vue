<script setup>
  import { useRoute } from "vue-router";
  import { watch, onMounted, computed, ref, nextTick } from "vue";
  import CRMToolsBar from "@components/CRMToolsBar.vue";
  import LeadToolsBar from "./components/LeadToolsBar.vue";
  import LeadDataTable from "./components/LeadDataTable.vue";
  import { useLeadsStore, usePlatformStore } from "@stores";
  import AddNewLeadModal from "./components/modals/AddNewLeadModal.vue";
  import MultipleLeadDeleteModal from "./components/modals/MultipleLeadDeleteModal.vue";
  import UploadSpreadsheetModal from "./components/modals/UploadSpreadsheetModal.vue";
  import FilterRightSidebar from "./components/FilterRightSidebar.vue";

  const route = useRoute();
  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();
  const toggleFilter = computed(() => leadsStore.getToggleFilter);
  const toggleAddNewModal = computed(() => leadsStore.getAddNewLeadModal);
  const toggle_multiple_lead_delete = ref(false);

  async function handleFetchLeads(payload, fetch = false, reset = false) {

    if (reset) leadsStore.setFetchQuery("clear");

    await nextTick();

    leadsStore.setFetchQuery(payload, fetch);
  }

  function handleToggleDeleteLead() {

    toggle_multiple_lead_delete.value = !toggle_multiple_lead_delete.value;

  }

  watch(route, () => {

    let payload = route.query;

    handleFetchLeads(payload, true, true);

  }, { deep: true });

  onMounted(() => {

    leadsStore.setIsFirstLoading(true);

    platformStore.callFetchProperties();

    platformStore.callFetchStatuses();

    handleFetchLeads(route.query, true);

  });

</script>

<template>

  <section class="content">

    <CRMToolsBar />

    <lead-tools-bar @multiple-delete="handleToggleDeleteLead" />

    <filter-right-sidebar v-if="!(toggleFilter === 'render')" />

    <lead-data-table />

  </section>

  <add-new-lead-modal v-if="toggleAddNewModal"
    v-model:visible="toggleAddNewModal"
    @refresh="handleFetchLeads({ page: 1 }, true, true)" />

  <multiple-lead-delete-modal v-if="toggle_multiple_lead_delete"
    v-model:visible="toggle_multiple_lead_delete"
    @close="toggle_multiple_lead_delete = false"
    @refresh="handleFetchLeads(route.query, true)" />

  <upload-spreadsheet-modal />

</template>
<style>
  .tbl-lead-owner-list .dropdown-menu {
    inset: 0px 0px auto auto !important;
  }
</style>