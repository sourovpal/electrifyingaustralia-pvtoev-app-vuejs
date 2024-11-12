<script setup>
import { watch, onMounted, computed } from "vue";
import CRMToolsBar from "@components/CRMToolsBar.vue";
import LeadToolsBar from "./components/LeadToolsBar.vue";
import LeadDataTable from "./components/LeadDataTable.vue";
import { useLeadsStore, usePlatformStore } from "@stores";
import { useRoute } from "vue-router";
import AddNewLeadModal from "./components/modals/AddNewLeadModal.vue";
import MultipleLeadDeleteModal from "./components/modals/MultipleLeadDeleteModal.vue";
import UploadSpreadsheetModal from "./components/modals/UploadSpreadsheetModal.vue";
import FilterRightSidebar from "./components/FilterRightSidebar.vue";

const route = useRoute();
const leadsStore = useLeadsStore();
const platformStore = usePlatformStore();
const toggleFilter = computed(() => leadsStore.getToggleFilter);
const toggleAddNewModal = computed(() => leadsStore.getAddNewLeadModal);

function handleFetchLeads(payload, fetch = false, reset = false) {
  if (reset) {
    leadsStore.setFetchQuery("clear");
  }
  leadsStore.setFetchQuery(payload, fetch);
}

watch(
  route,
  () => {
    let payload = route.query;
    handleFetchLeads(payload, true, true);
  },
  { deep: true }
);

onMounted(() => {
  leadsStore.setIsFirstLoading(true);
  platformStore.callFetchProperties();
  platformStore.callFetchStatuses();
  handleFetchLeads(route.query, true);
});
</script>

<template>

  <section class="content">

    <CRMToolsBar></CRMToolsBar>

    <lead-tools-bar></lead-tools-bar>

    <filter-right-sidebar
      v-if="!(toggleFilter === 'render')"
    ></filter-right-sidebar>

    <lead-data-table></lead-data-table>

  </section>

  <add-new-lead-modal
    v-if="toggleAddNewModal"
    v-model:visible="toggleAddNewModal"
    @refresh="handleFetchLeads({ page: 1 }, true, true)"
  ></add-new-lead-modal>

  <multiple-lead-delete-modal
    @refresh="handleFetchLeads(route.query, true)"
  ></multiple-lead-delete-modal>

  <upload-spreadsheet-modal></upload-spreadsheet-modal>

</template>
<style>
.tbl-lead-owner-list .dropdown-menu {
  inset: 0px 0px auto auto !important;
}
</style>