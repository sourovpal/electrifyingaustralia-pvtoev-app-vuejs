<script setup>
    import { ref, defineProps, defineEmits, computed, watchEffect } from 'vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import DropdownOwnerList from '../../components/dropdowns/DropdownOwnerList.vue';
    import { AvatarIcon } from "@assets/icons";
    import { usePlatformStore } from "@stores";
    import { useLeadsStore } from '@stores';
    import { useDebounceFn } from '@vueuse/core';

    const leadsStore = useLeadsStore();
    const platformStore = usePlatformStore();
    const emits = defineEmits([]);
    const searchTasks = ref(null);
    const userIsLoading = ref(false);
    const owner = ref(null);
    const selectedRows = ref([]);
    const searchInput = ref(null);

    // Computed
    const pagination = computed(() => leadsStore.getLeadPagination);
    const isLoading = computed(() => leadsStore.getIsLoading);
    const selectedLeads = computed(() => leadsStore.getSelectedLeads);
    const leads = computed(() => leadsStore.getLeads);
    const isAllLeadSelected = computed(() => leadsStore.getIsAllLeadSelected);
    const isSomeLeadSelected = computed(() => leadsStore.getIsSomeLeadSelected);
    const deleteModalInstance = computed(() => leadsStore.getMultipleDeleteModal);
    const addNewModalInstance = computed(() => leadsStore.getAddNewLeadModal);
    const leadSources = computed(() => platformStore.getSources);
    const leadStatuses = computed(() => platformStore.getStatuses);


    function showMultipleModal() {
        deleteModalInstance.value?.show();
    }

    function showAddNewModal() {
        if (!leadSources.value?.length) {
            platformStore.callFetchSources();
        }
        if (!leadStatuses.value?.length) {
            platformStore.callFetchStatuses();
        }
        addNewModalInstance.value?.show();
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
        leadsStore.setFetchQuery(payload, true);
    }

    const handleSearch = useDebounceFn(() => {
        leadsStore.setFetchQuery({ search: searchInput.value, page: 1 }, true);
    }, 1000);

    const handleRefresh = useDebounceFn(() => {
        searchInput.value = null;
        leadsStore.setFetchQuery(false, true);
    }, 0);

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

            <div>
                <button @click="handleRefresh"
                    class="btn btn-light btn-floating ms-2"
                    :disabled="isLoading">
                    <svg-custom-icon v-if="isLoading"
                        icon="spinner-icon" />
                    <svg-custom-icon v-else
                        icon="loader-icon" />
                </button>
            </div>

            <div class="search-bar w-100">
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
                v-if="Object.keys({}).length">
                <button class="btn btn-success btn-sm">
                    {{ Object.keys({}).length }} active filter
                </button>
                <!-- <button @click="toggleFilterSidebarHandler((toggleFilterSidebar == 'hide')?'show':'close')"
                    class="btn btn-success btn-sm px-2 active">
                    <svg v-if="toggleFilterSidebar == 'show'"
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 0 24 24"
                        width="18px"
                        fill="currentColor">
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                        </path>
                    </svg>
                    <svg v-else
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 0 24 24"
                        width="18px"
                        fill="currentColor">
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
                    </svg>
                </button> -->
            </div>

            <button v-else
                class="toolbar-btn btn btn-light btn-floating me-3 d-none d-xl-block"
                v-tippy="{ content: 'Filter Leads', placement: 'top' }"
                @click="'toggleFilterSidebar' == 'show'">
                <svg class="svg-5"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24">
                    <path d="M0 0h24v24H0z"
                        fill="none"></path>
                    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
                </svg>
            </button>

            <div class="me-3">
                <button class="btn btn-sm btn-primary fw-bold d-none d-xl-block white-space-nowrap"
                    @click="showAddNewModal">
                    <font-awesome-icon icon="fas fa-user-plus"
                        class="fs-14px me-1"></font-awesome-icon>
                    New Lead's
                </button>
            </div>

            <div class="me-3 d-none d-xl-block">
                <div class="dropdown import-dropdown">
                    <button
                        class="btn btn-sm btn-outline-secondary curtom-dropdown-toggler-btn fw-bold d-flex align-items-center"
                        v-tippy="{ content: 'Import File or Connect', placement: 'top' }"
                        type="button"
                        data-mdb-toggle="dropdown"
                        aria-expanded="false">
                        <span class="pe-4 text-head">Import</span>
                        <div class="dropdown--icon">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"></path>
                                <path d="M0 0h24v24H0z"
                                    fill="none"></path>
                            </svg>
                        </div>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li @click="$refs['UploadSpreadsheetModalRef'].showModalHandler()">
                            <a class="dropdown-item cursor-pointer">Upload spreadsheet...</a>
                        </li>
                        <li>
                            <a class="dropdown-item"
                                href="#">Connect to lead providers</a>
                        </li>
                    </ul>
                </div>
            </div>
            <button class="toolbar-btn btn btn-light btn-floating me-3 d-none d-xl-block"
                v-tippy="{ content: 'Show/Hide Properties', placement: 'top' }"
                data-mdb-toggle="dropdown">
                <svg class="svg-5"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#000000">
                    <path
                        d="M3,5H8.3V19H3zM17,10c1.5,0,2.9,0.5,4,1.3V5h-5.3v5.1C16.1,10,16.5,10,17,10zM10,17c0-3,2-5.6,4.7-6.6V5H9.3v14h1C10.1,18.4,10,17.7,10,17zM20.8,17c0-0.2,0-0.4-0.1-0.6l1.1-1l-1-1.7l-1.5,0.5c-0.3-0.3-0.7-0.5-1.1-0.6L18,12h-2l-0.3,1.5c-0.4,0.1-0.8,0.4-1.1,0.6l-1.4-0.5l-1,1.7l1.1,1c0,0.2-0.1,0.4-0.1,0.6s0,0.4,0.1,0.6l-1.1,1l1,1.7l1.4-0.5c0.3,0.3,0.7,0.5,1.1,0.6L16,22h2l0.3-1.5c0.4-0.1,0.8-0.4,1.1-0.6l1.5,0.5l1-1.7l-1.1-1C20.7,17.4,20.8,17.2,20.8,17z M17,19c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S18.1,19,17,19z">
                    </path>
                </svg>
            </button>
            <!-- <HeaderPropertiesDropdown :customHeaderColumns="leadProperties"
                :disabledHeaderColumns="disabledHeaderColumns"
                :toggleHeaderProperties="toggleHeaderProperties" /> -->

            <!-- Show current Lead Range -->
            <div class="fw-bold d-flex justify-content-center align-items-center me-2 text-overflow-ellipsis fs-16px d-none d-xl-block"
                style="min-width: 2rem">
                {{ pagination?.from ?? 0 }} - {{ pagination?.to ?? 0 }} of
                {{ pagination?.total ?? 0 }}
            </div>
            <div v-if="!Object.keys({}).length"
                class="fw-bold d-flex justify-content-center align-items-center me-2 text-overflow-ellipsis fs-16px d-block d-xl-none"
                style="min-width: 2rem">
                {{ pagination?.from ?? 0 }} - {{ pagination?.to ?? 0 }} of
                {{ pagination?.total ?? 0 }}
            </div>
            <!-- Show current Lead Range End -->

            <button :disabled="!pagination?.prev_page || isLoading"
                @click="handlePagination({ page: pagination?.prev_page })"
                v-tippy="{ content: 'Previous', placement: 'top' }"
                class="toolbar-btn btn btn-light btn-floating me-3">
                <font-awesome-icon icon="fas fa-arrow-left"
                    class="text-soft fs-16px"></font-awesome-icon>
            </button>

            <button :disabled="!pagination?.next_page || isLoading"
                v-tippy="{ content: 'Next', placement: 'top' }"
                @click="handlePagination({ page: pagination?.next_page })"
                class="toolbar-btn btn btn-light btn-floating me-3">
                <font-awesome-icon icon="fas fa-arrow-right"
                    class="text-soft fs-16px"></font-awesome-icon>
            </button>

            <div class="me-3 d-lg-inline d-xl-none">
                <button class="toolbar-btn btn btn-light btn-sm btn-floating"
                    data-mdb-toggle="dropdown">
                    <svg class="svg-5"
                        height="20px"
                        viewBox="0 0 24 24"
                        width="20px"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z">
                        </path>
                        <path d="M0 0h24v24H0z"
                            fill="none"></path>
                    </svg>
                </button>
                <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot"
                    aria-labelledby="dropdownMenuButton">
                    <span @click="$refs['AddNewLeadModalRef'].showModalHandler()"
                        class="dropdown-item cursor-pointer text-head">Add New</span>
                    <span class="dropdown-item cursor-pointer text-head">Import</span>
                    <span @click="toggleFilterSidebar = !toggleFilterSidebar"
                        class="dropdown-item cursor-pointer text-head">Filter Leads</span>
                </div>
            </div>
        </right-action-bar>
    </action-bar>
</template>

<style lang="scss"
    scoped>
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