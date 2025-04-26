<script setup>
    import { ref, computed } from 'vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import HeaderPropertiesDropdown from './HeaderPropertiesDropdown.vue';
    import { usePlatformStore, useLeadsStore } from "@stores";
    import { useDebounceFn } from '@vueuse/core';
    import { useRouter, useRoute } from 'vue-router';
    import { delay } from '@helpers';
    import TablePagination from '@components/Datatable/TablePagination.vue';
    import TableRefreshSpinner from '@components/Datatable/TableRefreshSpinner.vue';

    const emits = defineEmits(['multiple-delete']);

    const router = useRouter();
    const route = useRoute();
    const leadsStore = useLeadsStore();
    const platformStore = usePlatformStore();
    const searchInput = ref(null);

    // Computed
    const pagination = computed(() => leadsStore.getLeadPagination);
    const isLoading = computed(() => leadsStore.getIsLoading);
    const selectedLeads = computed(() => leadsStore.getSelectedLeads);
    const leads = computed(() => leadsStore.getLeads);
    const isAllLeadSelected = computed(() => leadsStore.getIsAllLeadSelected);
    const isSomeLeadSelected = computed(() => leadsStore.getIsSomeLeadSelected);
    const spreadsheetModalInstance = computed(() => leadsStore.getUploadSpreadsheetModal);
    const leadSources = computed(() => platformStore.getSources);
    const leadStatuses = computed(() => platformStore.getStatuses);
    const toggleFilter = computed(() => leadsStore.getToggleFilter);
    const filterQuerys = computed(() => leadsStore.getFilterQuerys);

    function showSpreadsheetModal() {
        spreadsheetModalInstance.value?.show();
    }

    function showAddNewModal() {

        if (!leadSources.value?.length) platformStore.callFetchSources();

        if (!leadStatuses.value?.length) platformStore.callFetchStatuses();

        leadsStore.setAddNewLeadModal(true);
    }

    function selectAllOrNotLeads() {

        if (isAllLeadSelected.value || isSomeLeadSelected.value)
            return leadsStore.setSelectedLeads([]);

        let leadIds = leads.value?.map(lead => lead.lead_id);
        leadsStore.setSelectedLeads(leadIds);
    }

    function handlePagination(payload) {
        router.push({ query: { ...route.query, ...payload } });
    }

    const handleSearch = useDebounceFn(() => {

        let page = route.query.page ?? 1;

        router.push({ path: '/platform/leads', query: { ...route.query, page, search: searchInput.value } });

    }, 1000);

    const handleRefresh = useDebounceFn(() => {

        router.push({ path: '/platform/leads' });

        searchInput.value = null;

        leadsStore.setFilterQuerys(false, false, true);

        leadsStore.setFetchQuery(false, true);

    }, 500);

    async function handleToggleFilter() {
        if (!platformStore.getSources?.length)
            platformStore.callFetchSources();

        if (!platformStore.getUsers?.length)
            platformStore.callFetchUsers();

        if (toggleFilter.value && Object.keys(filterQuerys.value).length) {

            leadsStore.setFilterQuerys(false, false, true);

            leadsStore.setFetchQuery({}, true);

            leadsStore.setToggleFilter(false);

            await delay(500);

            leadsStore.setToggleFilter('render')

            await delay(200);

            leadsStore.setToggleFilter(false);

        } else {

            leadsStore.setToggleFilter(!toggleFilter.value);

        }
    }

</script>

<template>

    <action-bar>

        <left-action-bar>

            <custom-checkbox class="ms-2"
                @click="selectAllOrNotLeads"
                :checked="isAllLeadSelected"
                :reset="isSomeLeadSelected">
            </custom-checkbox>

            <table-refresh-spinner @click="handleRefresh"
                :loading="isLoading"></table-refresh-spinner>

            <danger-button v-if="selectedLeads.length"
                size="small"
                @click="emits('multiple-delete')" class="d-flex justify-content-center align-items-center">
                <material-icon class="ms-n1" name="delete"></material-icon>
                <span class="ms-n1">{{ selectedLeads.length }} selected</span>
            </danger-button>

        </left-action-bar>

        <right-action-bar>

            <div class="me-3 d-lg-flex d-none">

                <success-button @click="showAddNewModal"
                    :loading="false"
                    size="small"
                    label="Add New"
                    icon="pi pi-user-plus fs-18px">
                </success-button>

            </div>

            <div class="me-3 d-none d-xl-block">

                <div class="dropdown import-dropdown">

                    <button
                        class="btn btn-sm btn-outline-secondary dropdown-toggler-btn fw-bold d-flex align-items-center"
                        v-tippy="{ content: 'Import File', placement: 'top' }"
                        data-mdb-toggle="dropdown">

                        <span class="pe-4 text-head">Import</span>

                        <div class="dropdown--icon">

                            <font-awesome-icon icon="fas fa-caret-down"
                                class="fs-14px text-head"></font-awesome-icon>

                        </div>
                    </button>

                    <ul class="dropdown-menu dropdown-menu-end">

                        <li class="dropdown-item cursor-pointer"
                            @click="showSpreadsheetModal">
                            Upload spreadsheet...
                        </li>

                        <li>

                            <a class="dropdown-item">Connect to lead providers</a>

                        </li>

                    </ul>

                </div>

            </div>

            <div class="btn-group me-3"
                v-if="Object.keys(filterQuerys).length">

                <button class="btn crm-btn btn-sm">
                    {{ Object.keys(filterQuerys).length }} active filter
                </button>

                <button @click="handleToggleFilter"
                    class="btn crm-btn btn-sm ps-1 pe-2 active d-flex justify-content-center align-items-center">

                    <i v-if="!toggleFilter"
                        class="pi pi-filter fs-15px"></i>

                    <i v-else
                        class="pi pi-times fs-15px"></i>

                </button>

            </div>

            <div v-else
                class="d-lg-inline d-none me-3">
                <circle-button @click="handleToggleFilter"
                    v-tippy="{ content: 'Filter Leads', placement: 'top' }">

                    <material-icon name="filter_alt"
                        size="20"></material-icon>

                </circle-button>
            </div>

            <div class="d-lg-inline d-none me-3">

                <circle-button data-mdb-toggle="dropdown">

                    <material-icon name="playlist_add_check"
                        size="22"
                        type="outlined"></material-icon>

                </circle-button>

                <header-properties-dropdown></header-properties-dropdown>

            </div>

            <table-pagination :pagination="pagination"
                @change="(_page)=>handlePagination({page:_page})"></table-pagination>

            <div class="me-3 d-lg-inline d-xl-none">

                <button class="toolbar-btn btn btn-light btn-sm btn-floating"
                    data-mdb-toggle="dropdown">

                    <font-awesome-icon icon="fas fa-ellipsis-vertical"></font-awesome-icon>

                </button>

                <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot">
                    <span @click="showAddNewModal"
                        class="dropdown-item cursor-pointer text-head py-1">Add New</span>

                    <span class="dropdown-item cursor-pointer text-head py-1">Import</span>

                    <span @click="handleToggleFilter"
                        class="dropdown-item cursor-pointer text-head py-1">Filter Leads</span>

                </div>
            </div>
        </right-action-bar>
    </action-bar>
</template>

<style lang="scss"
    scoped>
    .custom-dropdown-menu.three-dot {
        min-width: 12rem;
    }

    .dropdown-toggler-btn {
        border: 1px solid rgba(0, 0, 0, 0.09);

        &:hover {
            background-color: #f7f7f9 !important;
            border: 1px solid #007ee5 !important;
            box-shadow: 0 1px 3px rgba(0, 126, 229, 0.34) !important;
        }
    }

    .search-bar {
        input {
            border-color: var(--layout-border-color) !important;
        }

        .search-icon {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
</style>