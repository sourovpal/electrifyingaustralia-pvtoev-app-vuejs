<script setup>
  import { ref, watch, onMounted, computed, watchEffect } from 'vue';
  import SearchBar from '@components/SearchBar.vue';
  import LeadToolsBar from './components/LeadToolsBar.vue';
  import LeadDataTable from './components/LeadDataTable.vue';
  import { useLeadsStore, usePlatformStore } from '@stores';
  import { useRoute } from 'vue-router';
  import AddNewLeadModal from './components/modals/AddNewLeadModal.vue';
  import MultipleLeadDeleteModal from './components/modals/MultipleLeadDeleteModal.vue';
  import UploadSpreadsheetModal from './components/modals/UploadSpreadsheetModal.vue';
  import FilterRightSidebar from './components/FilterRightSidebar.vue';

  const route = useRoute();
  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();
  const toggleFilter = computed(() => leadsStore.getToggleFilter);


  function handleFetchLeads(payload, fetch = false, reset = false) {
    if (reset) {
      leadsStore.setFetchQuery('clear');
    }
    leadsStore.setFetchQuery(payload, fetch);
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
    <search-bar></search-bar>
    <lead-tools-bar></lead-tools-bar>
    <filter-right-sidebar v-if="!(toggleFilter === 'render')"></filter-right-sidebar>
    <lead-data-table></lead-data-table>
  </section>
  <add-new-lead-modal @refresh="handleFetchLeads({page:1}, true, true)"></add-new-lead-modal>
  <multiple-lead-delete-modal @refresh="handleFetchLeads(route.query, true)"></multiple-lead-delete-modal>
  <upload-spreadsheet-modal></upload-spreadsheet-modal>
</template>
<style>
  .tbl-lead-owner-list .dropdown-menu {
    inset: 0px 0px auto auto !important;
  }
</style>
<style scoped
  lang="scss">
  .curtom-dropdown-toggler-btn {
    border: 1px solid rgba(0, 0, 0, 0.09);

    &:hover {
      background-color: #f7f7f9 !important;
      border: 1px solid #007ee5 !important;
      box-shadow: 0 1px 3px rgba(0, 126, 229, 0.34) !important;
    }
  }

  .custom-dropdown-menu {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border-radius: 3px;

    ::after {
      content: "";
      position: absolute;
      top: -6px;
      right: 20px;
      border: 7px solid white;
      transform: rotate(45deg);
      border-bottom-color: transparent;
      border-right-color: transparent;
    }
  }
</style>