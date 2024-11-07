<script setup>
    import { ref, computed } from 'vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import HeaderPropertiesDropdown from '../../components/dropdowns/HeaderPropertiesDropdown.vue';
    import { usePlatformStore, useLeadsStore } from "@stores";
    import { useDebounceFn } from '@vueuse/core';
    import { useRouter, useRoute } from 'vue-router';
    import { delay } from '@helpers';

    const router = useRouter();
    const route = useRoute();
    const leadsStore = useLeadsStore();
    const platformStore = usePlatformStore();
    const emits = defineEmits([]);
    const searchInput = ref(null);

    // Computed
    const pagination = computed(() => leadsStore.getLeadPagination);
    const isLoading = computed(() => leadsStore.getIsLoading);
    const selectedLeads = computed(() => leadsStore.getSelectedLeads);
    const leads = computed(() => leadsStore.getLeads);
    const isAllLeadSelected = computed(() => leadsStore.getIsAllLeadSelected);
    const isSomeLeadSelected = computed(() => leadsStore.getIsSomeLeadSelected);
    const deleteModalInstance = computed(() => leadsStore.getMultipleDeleteModal);
    const spreadsheetModalInstance = computed(() => leadsStore.getUploadSpreadsheetModal);
    const leadSources = computed(() => platformStore.getSources);
    const leadStatuses = computed(() => platformStore.getStatuses);
    const toggleFilter = computed(() => leadsStore.getToggleFilter);
    const filterQuerys = computed(() => leadsStore.getFilterQuerys);

    function showMultipleModal() {
        deleteModalInstance.value?.show();
    }

    function showSpreadsheetModal() {
        spreadsheetModalInstance.value?.show();
    }

    function showAddNewModal() {
        if (!leadSources.value?.length) {
            platformStore.callFetchSources();
        }
        if (!leadStatuses.value?.length) {
            platformStore.callFetchStatuses();
        }
        leadsStore.setAddNewLeadModal(true);
    }

    function selectAllOrNotLeads() {
        if (isAllLeadSelected.value || isSomeLeadSelected.value) {
            leadsStore.setSelectedLeads([]);
        } else {
            let leadIds = leads.value?.map(lead => lead.lead_id);
            leadsStore.setSelectedLeads(leadIds);
        }
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
        if (!platformStore.getSources?.length) {
            platformStore.callFetchSources();
        }
        if (!platformStore.getUsers?.length) {
            platformStore.callFetchUsers();
        }
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

            <div class="d-flex justify-content-center align-item-start"
                style="margin-left: 8px">
                <custom-checkbox @click="selectAllOrNotLeads"
                    :checked="isAllLeadSelected"
                    :reset="isSomeLeadSelected" />
            </div>

            <div class="d-lg-inline d-none">
                <button @click="handleRefresh"
                    class="btn btn-light btn-floating ms-2"
                    :disabled="isLoading">
                    <svg-custom-icon v-if="isLoading"
                        icon="spinner-icon" />
                    <svg-custom-icon v-else
                        icon="loader-icon" />
                </button>
            </div>

            <div class="search-bar w-100 d-lg-inline d-none">
                <div class="position-relative ms-4 w-100">
                    <input type="text"
                        v-model="searchInput"
                        class="form-control ps-5"
                        placeholder="Search keywords..."
                        @keyup="handleSearch()" />
                    <font-awesome-icon icon="fas fa-search"
                        class="ms-3 search-icon text-soft"></font-awesome-icon>
                </div>
            </div>

            <div class="ms-4">
                <button @click="showMultipleModal"
                    class="btn btn-danger btn-sm me-3 ms-3 d-flex justify-content-between align-items-center white-space-nowrap"
                    v-tippy="{ content: 'Delete Leads', placement: 'top' }"
                    v-if="selectedLeads.length">
                    <span class="fs-14px d-none d-xl-inline">{{ selectedLeads.length }} selected</span>
                    <span class="ms-xl-2">
                        <svg-custom-icon icon="trash-icon" />
                    </span>
                </button>
            </div>

        </left-action-bar>

        <right-action-bar>
            <div class="btn-group me-3"
                v-if="Object.keys(filterQuerys).length">
                <button class="btn crm-btn btn-sm">
                    {{ Object.keys(filterQuerys).length }} active filter
                </button>
                <button @click="handleToggleFilter"
                    class="btn crm-btn btn-sm ps-1 pe-2 active d-flex justify-content-center align-items-center">
                    <font-awesome-icon v-if="!toggleFilter"
                        icon="fas fa-filter"
                        class="fs-15px"></font-awesome-icon>
                    <font-awesome-icon v-else
                        icon="fas fa-close"
                        class="fs-15px"></font-awesome-icon>
                </button>
            </div>
            <div v-else
                class="d-lg-inline d-none">
                <button
                    class="toolbar-btn btn btn-light btn-floating me-3 d-flex justify-content-center align-items-center"
                    v-tippy="{ content: 'Filter Leads', placement: 'top' }"
                    @click="handleToggleFilter">
                    <font-awesome-icon icon="fas fa-filter"
                        class="fs-15px text-head"></font-awesome-icon>
                </button>
            </div>

            <div class="me-3 d-lg-inline d-none">
                <button class="btn btn-sm crm-btn fw-bold d-none d-xl-block white-space-nowrap"
                    @click="showAddNewModal">
                    <font-awesome-icon icon="fas fa-user-plus"
                        class="fs-14px me-1"></font-awesome-icon>
                    Add new
                </button>
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

            <div class="d-lg-inline d-none">
                <button class="toolbar-btn btn btn-light btn-floating me-3 d-none d-xl-block"
                    v-tippy="{ content: 'Show/Hide Properties', placement: 'top' }"
                    data-mdb-toggle="dropdown">
                    <font-awesome-icon icon="fas fa-list-check"
                        class="fs-16px text-head"></font-awesome-icon>
                </button>
                <header-properties-dropdown></header-properties-dropdown>
            </div>

            <div class="fw-bold d-flex justify-content-center align-items-center me-2 text-overflow-ellipsis fs-16px"
                style="min-width: 5rem">
                {{ pagination?.from ?? 0 }} - {{ pagination?.to ?? 0 }} of {{ pagination?.total?? 0 }}
            </div>

            <div class="">
                <button :disabled="!pagination?.prev_page || isLoading"
                    @click="handlePagination({ page: pagination?.prev_page })"
                    v-tippy="{ content: 'Previous', placement: 'top' }"
                    class="toolbar-btn btn btn-light btn-floating me-3">
                    <font-awesome-icon icon="fas fa-arrow-left"
                        class="text-head fs-16px"></font-awesome-icon>
                </button>
                <button :disabled="!pagination?.next_page || isLoading"
                    v-tippy="{ content: 'Next', placement: 'top' }"
                    @click="handlePagination({ page: pagination?.next_page })"
                    class="toolbar-btn btn btn-light btn-floating me-3">
                    <font-awesome-icon icon="fas fa-arrow-right"
                        class="text-head fs-16px"></font-awesome-icon>
                </button>
            </div>

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