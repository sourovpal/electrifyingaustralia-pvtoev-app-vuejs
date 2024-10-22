<script setup>
import {ref, computed} from 'vue';
import SearchBar from '../../components/SearchBar.vue';
import ActionBar from '../../components/ActionBar/ActionBar.vue';
import LeftActionBar from '../../components/ActionBar/LeftActionBar.vue';
import RightActionBar from '../../components/ActionBar/RightActionBar.vue';
import Datatable from '../../components/Datatable/Datatable.vue';
import DatatableHeader from '../../components/Datatable/DatatableHeader.vue';
import DatatableBody from '../../components/Datatable/DatatableBody.vue';
import DatatableNoDataMessage from '../../components/Datatable/DatatableNoDataMessage.vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '../../stores/project.js';

const router = useRouter();

const selectedRows = ref([]);
const filterQueryData = ref({});

const handleRowClick = (projectId) => {
    router.push(`/library/proposals/${projectId}`); 
}

const projectStore = useProjectStore();
const projects = computed(() => projectStore.projectList);

</script>

<template>
    <section class="content lead-list">
        <SearchBar
            placeholderText="Search for a project" 
        />
        <!-- temporary -->
        <action-bar>
            <left-action-bar>
                <div class=" d-flex justify-content-center align-item-start">
                    <label class="custom-form-checkbox btn btn-floating btn-light" @click="selectedAllRowsHandler">
                        <svg v-if="!isSelectedAllRows && !isSelectedAllRowsReset" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                        <svg v-else-if="isSelectedAllRows && !isSelectedAllRowsReset" class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                        <svg v-if="isSelectedAllRowsReset" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="a" d="M0 0h24v24H0z"></path></defs> <clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath> <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" clip-path="url(#b)"></path></svg>
                    </label>
                </div>
                <button class="btn btn-light btn-floating ms-2" :disabled="isLoading" @click="fetchAllLeadsHandler()">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                </button>

                <button 
                    @click="$refs['DeleteMultipleLeadModalRef'].showModalHandler()" 
                    class="btn btn-danger btn-sm me-3 ms-3 d-flex justify-content-between align-items-center white-space-nowrap" 
                    v-tippy='{ content:"Delete Leads", placement : "top" }'
                    v-if="selectedRows.length">
                    <span class="fs-14px d-none d-xl-inline">{{ selectedRows.length }} selected</span>
                    <span class="ms-xl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" width="20px" height="20px"><path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"/></svg>
                    </span>
                </button>
                <!-- Leas Status -->
                <div 
                    v-if="selectedRows.length" 
                    v-tippy='{ content:"Change Lead Status", placement : "top" }'
                    class="dropdown ms-2 d-none d-xl-block">
                    <button 
                        style="width:130px;"
                        class="btn btn-sm btn-outline-secondary fw-400 d-flex justify-content-between align-items-center curtom-dropdown-toggler-btn" 
                        type="button" 
                        data-mdb-toggle="dropdown" 
                        aria-expanded="false">
                        <span class="fw-bold text-fs tbl-dropdown-title text-overflow-ellipsis text-head">Lead Status</span>
                        <div class="dropdown--icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                        </div>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span
                            style="width:170px;"
                            v-for="(status, index) in leadStatus" 
                            :key="index" 
                            @click="updateLeadStatusHandler(selectedRows, status)"
                            class="dropdown-item d-flex justify-content-between align-items-center cursor-pointer py-1">
                            <span class="text-overflow-ellipsis text-head">{{ status?.name }}</span>
                            <svg v-if="status?.is_lost" class="svg-5" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"></path></svg>
                        </span>
                    </div>
                </div>

                <!-- Owner list -->
                <div 
                    v-if="selectedRows.length"         
                    class="settings-group-item owner-list-dropdown ms-3 ps-2 position-relative d-none d-xl-block">
                    <button class="owner-dropdown-toggler" data-mdb-toggle="dropdown" aria-expanded="false" v-tippy='{ content:"Change Owner", placement : "top" }'>
                        <div class="icon">
                            <img :src="icons.avatar" alt="">
                        </div>
                    </button>
                    <DropdownOwnerList
                    :owners="owners"
                    :selectOwnerHandler="(item)=>updateLeadOwnerHandler(item, null)"
                />
                </div>

            </left-action-bar>

            <right-action-bar>
                <button class="toolbar-btn border-0 bg-transparent d-none d-xl-flex gap-2 me-4" 
                    v-tippy='{ content:"Filter Leads", placement : "top" }'
                    @click="toggleFilterSidebar=!toggleFilterSidebar">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path   d="M0 0h24v24H0z" fill="none"></path> <path   d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></svg>
                    <span class="fw-bold">All users</span>
                </button>

                <!-- Show current Lead Range -->
                <div class="fw-bold d-flex justify-content-center align-items-center me-2 text-overflow-ellipsis fs-16px d-none d-xl-block" style="min-width: 2rem;">
                    {{ pagination?.from??0 }} - {{ pagination?.to??0 }} of  {{ pagination?.total??0 }}
                </div>
                <div v-if="!Object.keys(filterQueryData).length" class="fw-bold d-flex justify-content-center align-items-center me-2 text-overflow-ellipsis fs-16px d-block d-xl-none" style="min-width: 2rem;">
                    {{ pagination?.from??0 }} - {{ pagination?.to??0 }} of  {{ pagination?.total??0 }}
                </div>
                <!-- Show current Lead Range End -->

                <button 
                    :disabled="!pagination?.prev_page" 
                    @click="pagination?.prev_page && updateUrlQuery({page:pagination?.prev_page})" 
                    v-tippy='{ content:"Previous", placement : "top" }'
                    class="toolbar-btn btn btn-light btn-floating me-3">
                    <svg  class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </button>

                <button 
                    :disabled="!pagination?.next_page" 
                    v-tippy='{ content:"Next", placement : "top" }'
                    @click="pagination?.next_page && updateUrlQuery({page:pagination?.next_page})" 
                    class="toolbar-btn btn btn-light btn-floating me-3">
                    <svg class="svg-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                </button>

                <div class="me-3 d-lg-inline d-xl-none">
                    <button class="toolbar-btn btn btn-light btn-sm btn-floating" data-mdb-toggle="dropdown">
                        <svg class="svg-5" height="20px" viewBox="0 0 24 24" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path> <path d="M0 0h24v24H0z" fill="none"></path></svg>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot" aria-labelledby="dropdownMenuButton">
                        <span @click="$refs['AddNewLeadModalRef'].showModalHandler()" class="dropdown-item cursor-pointer text-head">Add New</span>
                        <span class="dropdown-item cursor-pointer text-head">Import</span>
                        <span @click="toggleFilterSidebar=!toggleFilterSidebar" class="dropdown-item cursor-pointer text-head">Filter Leads</span>
                    </div>
                </div>

            </right-action-bar>

        </action-bar>
        <Datatable>

            <!-- Datatable header -->
            <datatable-header class="">
                <div class="tbl-th" style="width:3.6rem;flex-grow: 1;"></div>
                <div class="tbl-th" style="width:79rem;flex-grow: 1;">Project</div>

                <div class="tbl-th d-flex align-items-baseline gap-2" style="width:10rem;flex-grow: 1;">
                    <p>Updated at</p>
				    <font-awesome-icon
				        class="text-secondary"
				        style="transform: rotate(90deg) scaleX(-1); font-size: .75rem;"
				        icon="fas fa-signal"
				    />
                </div>
                <div class="tbl-th" style="width:10rem;flex-grow: 1;">Created at</div>
            </datatable-header>

            <!-- Datatable body -->
            <datatable-body>
                <!-- loop this -->
                <div class="tbl-tr full-width" @click="handleRowClick(project.id)" v-for="project in projects">
                    <div style="width:4rem;margin-left: -7px;flex-grow: 1;" class="tbl-td full-width">
                        <label @click="singleRowSelectedHandler(lead.id)" class="custom-form-checkbox btn btn-floating btn-light">
                            <svg v-if="true" class="unchecked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                            <svg v-else class="checked" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                        </label>
                    </div>
                    <div class="tbl-td cursor-pointer d-block d-flex gap-2" style="width:29rem;flex-grow: 1;">
                        <div>
                            <p class="fs-6 mb-0">lead_id: <span class="text-secondary">{{ project.lead_id }}</span> </p>
                            <small class="mb-0 text-secondary">Lorem ipsum dolor sit amet, qui minim labore adipisicing...</small>
                        </div>
                    </div>
                    <div class="tbl-td d-block" style="width: 10rem; flex-grow: 1;">
                        <p class="fw-6 mb-0">$95,000.00</p>
                        <small class="text-secondary">99kW Jinko</small>
                    </div>
                    <div class="tbl-td gap-4" style="width: 40rem; flex-grow: 1;">
                        <div class="text-success d-flex flex-column align-items-center">
				            <font-awesome-icon icon="fas fa-signature" />
                            <small>Signed</small>
                        </div>
                        <div class="text-secondary d-flex flex-column align-items-center">
				            <font-awesome-icon icon="fas fa-thumbs-up" />
                            <small>Approved</small>
                        </div>
                    </div>
                    <div class="tbl-td" style="width:10rem;flex-grow: 1;">
                        25/06/2024
                    </div>
                    
                    <div class="tbl-td" style="width:10rem;flex-grow: 1;">
                        25/06/2023
                    </div>
                </div>

                <!-- <DataTableSkeletor v-if="isFirstLoading" /> -->
                <!-- temp condition -->
                <DatatableNoDataMessage v-if="false"  />
            </datatable-body>

        </Datatable>
    </section>
</template>

<style scoped>

</style>
