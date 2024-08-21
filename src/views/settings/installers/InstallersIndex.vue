<script>
    import { encode, decode } from 'js-base64';
    import ActionBar from '../../../components/ActionBar/ActionBar.vue';
    import LeftActionBar from '../../../components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '../../../components/ActionBar/RightActionBar.vue';
    import Datatable from '../../../components/Datatable/Datatable.vue';
    import DatatableHeader from '../../../components/Datatable/DatatableHeader.vue';
    import DatatableBody from '../../../components/Datatable/DatatableBody.vue';
    import DataTableSkeletor from './DataTableSkeletor.vue';
    import DataNotFound from './DataNotFound.vue';

    export default {
        components: {
            ActionBar,
            LeftActionBar,
            RightActionBar,
            Datatable,
            DatatableHeader,
            DatatableBody,
            DataTableSkeletor,
            DataNotFound,
        },
        data() {
            return {
                limit: 50,
                isFirstLoading: false,
                isLoading: false,
                fetchInstallers: [],
                pagination: {
                    total: 0,
                    per_page: 0,
                    current_page: 1,
                    next_page: null,
                    prev_page: null,
                    last_page: null,
                    from: 0,
                    to: 0
                },
                selectedRows: [],
                isSelectedAllRows: false,
                isSelectedAllRowsReset: false,
                search: null,
                searchDebounceTime: null,
            }
        },
        mounted() {
            this.isFirstLoading = true;
            this.fetchInstallerDataHandler();
        },
        watch: {
            search(query) {
                clearInterval(this.searchDebounceTime);
                this.searchDebounceTime = setTimeout(() => {
                    this.fetchInstallerDataHandler(1);
                }, 1000);
            }
        },
        methods: {
            async fetchInstallerDataHandler(page = this.pagination.current_page, limit = this.limit) {
                if (this.isLoading) { return; }
                this.isLoading = true;
                var payload = { page, limit };
                if (this.search) {
                    payload['search'] = this.search;
                }

                var res = await this.$apiRequest({
                    url: `/installers`,
                    payload,
                }).then((res) => {
                    const { success, installers, pagination } = res;
                    if (success) {
                        this.isFirstLoading = false;
                        this.isSelectedAllRows = false;
                        this.isSelectedAllRowsReset = false;
                        this.selectedRows = [];
                        this.fetchInstallers = installers;
                        this.pagination = pagination;
                    } else {
                        throw new Error('');
                    }
                }).catch((error) => {
                    this.$toast.error('Oops, something went wrong');
                });
                this.isLoading = false;
                this.isFirstLoading = false;
            },
            selectedAllRowsHandler() {

                if (this.isSelectedAllRowsReset) {
                    this.selectedRows = [];
                    this.isSelectedAllRowsReset = !this.isSelectedAllRowsReset;
                } else if (!this.isSelectedAllRows) {
                    this.isSelectedAllRows = !this.isSelectedAllRows;
                    this.fetchInstallers.map((item) => {
                        this.selectedRows.push(item.installer_id);
                    });
                } else {
                    this.selectedRows = [];
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }

            },
            singleRowSelectedHandler(id) {
                var index = this.selectedRows.indexOf(id);
                if (index > -1) {
                    this.selectedRows.splice(index, 1);
                } else {
                    this.selectedRows.push(id);
                }

                if (this.selectedRows.length === this.fetchInstallers.length) {
                    this.isSelectedAllRows = true;
                    this.isSelectedAllRowsReset = false;
                } else if (this.selectedRows.length > 0) {
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = true;
                } else {
                    this.isSelectedAllRows = false;
                    this.isSelectedAllRowsReset = false;
                }
            }
        },
    }
</script>

<template>
    <section class="content installer-list">
        <div class="content-header my-3">
            <h1 class="text-base">Installers</h1>
        </div>

        <div class="content-body- border-top">
            <action-bar>
                <left-action-bar>
                    <div class="ps-2">
                        <custom-checkbox @click="selectedAllRowsHandler"
                            :checked="isSelectedAllRows"
                            :reset="isSelectedAllRowsReset" />
                    </div>
                    <div>
                        <button :disabled="isLoading"
                            @click="fetchInstallerDataHandler()"
                            class="toolbar-btn btn btn-light btn-floating me-3 ms-3">
                            <svg class="svg-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <path
                                    d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z">
                                </path>
                                <path d="M0 0h24v24H0z"
                                    fill="none"></path>
                            </svg>
                        </button>

                    </div>
                    <div>
                        <button class="toolbar-btn btn btn-danger btn-sm me-3 ms-3"
                            v-if="selectedRows.length">
                            <span class="fs-12px">{{ selectedRows.length }} selected</span>
                            <span class="ms-2">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 30 30"
                                    fill="currentColor"
                                    width="20px"
                                    height="20px">
                                    <path
                                        d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z" />
                                </svg>
                            </span>
                        </button>
                    </div>

                </left-action-bar>

                <right-action-bar>
                    <div v-if="isLoading"
                        class="me-3">
                        <svg-custom-icon class="spinner"
                            icon="SpinnerIcon" />
                    </div>

                    <div class="position-relative mx-3">
                        <div class="search-bar">
                            <input class="form-control"
                                v-model="search"
                                placeholder="Search..."
                                type="text">
                        </div>
                        <div class="search-bar-icon">
                            <font-awesome-icon class="text-head"
                                icon="fas fa-search" />
                        </div>
                    </div>

                    <div class="me-3">
                        <router-link class="btn btn-primary fw-bold btn-sm"
                            to="/settings/installers/new">
                            <span><svg class="me-2"
                                    width="24"
                                    height="24"
                                    fill="#ffffff"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <title>account-plus</title>
                                    <path
                                        d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z">
                                    </path>
                                </svg></span>
                            Add New
                        </router-link>
                    </div>

                    <div class="fw-bold d-flex justify-content-center align-items-center me-3 text-overflow-ellipsis fs-16px"
                        style="min-width: 8rem;">
                        {{ pagination.from??0 }} - {{ pagination.to??0 }} of {{ pagination.total }}
                    </div>

                    <button :disabled="!pagination.prev_page"
                        @click="pagination.prev_page && fetchInstallerDataHandler(pagination.prev_page)"
                        class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg class="svg-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                        </svg>
                    </button>

                    <button :disabled="!pagination.next_page"
                        @click="pagination.next_page && fetchInstallerDataHandler(pagination.next_page)"
                        class="toolbar-btn btn btn-light btn-floating me-3">
                        <svg class="svg-5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </button>

                </right-action-bar>
            </action-bar>

            <Datatable>
                <datatable-header v-if="isFirstLoading || fetchInstallers.length">
                    <div class="tbl-th"
                        style="width:3.46rem;"></div>
                    <div class="tbl-th"
                        style="width:10rem;">Installer Name</div>
                    <div class="tbl-th "
                        style="width:10rem;">ABN</div>
                    <div class="tbl-th"
                        style="width:15rem;flex-grow: 1;">Company Name</div>
                    <div class="tbl-th"
                        style="width:15rem;flex-grow: 1;">Email Address</div>
                    <div class="tbl-th"
                        style="width:10rem;flex-grow: 1;">Phone Number</div>
                    <div class="tbl-th"
                        style="width:10rem;flex-grow: 1;">Hours Phone</div>
                    <div class="tbl-th"
                        style="width:20rem;flex-grow: 1;">Address</div>
                    <div class="tbl-th"
                        style="width:15rem;flex-grow: 1;">Tax Identifier Type</div>
                    <div class="tbl-th"
                        style="width:15rem;flex-grow: 1;">Electrical Licence Number</div>
                    <div class="tbl-th"
                        style="width:15rem;flex-grow: 1;">CEC Accreditation Number</div>
                    <div class="tbl-th"
                        style="width:15rem;flex-grow: 1;">Workmanship Warranty (years) </div>
                    <div class="tbl-th"
                        style="width:10rem;">Last Update</div>
                    <div class="tbl-th"
                        style="width:10rem;">Created At</div>
                </datatable-header>
                <datatable-body>
                    <div v-if="!isFirstLoading || fetchInstallers.length"
                        :class="selectedRows.includes(installer.id)?'active':''"
                        class="tbl-tr full-width"
                        v-for="(installer, index) in fetchInstallers"
                        :key="index">

                        <div style="width:4rem;margin-left: -7px;"
                            class="tbl-td full-width">
                            <custom-checkbox @click="singleRowSelectedHandler(installer.installer_id)"
                                :checked="selectedRows.includes(installer.installer_id)" />
                        </div>

                        <div style="width:10rem;"
                            class="tbl-td full-width">
                            <router-link class="text-overflow-ellipsis"
                                :to="`/settings/installers/edit/${installer.installer_id}`"> {{ installer.full_name
                                }}</router-link>
                        </div>

                        <div style="width:10rem;"
                            class="tbl-td full-width">
                            <span class="text-overflow-ellipsis">{{ installer.abn }}</span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td full-width">
                            <span class="text-overflow-ellipsis">{{ installer.company_name }}</span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.email }}</span>
                        </div>

                        <div style="width:10rem;flex-grow: 1;"
                            class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.phone_number }}</span>
                        </div>

                        <div style="width:10rem;flex-grow: 1;"
                            class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.house_phone_number }}</span>
                        </div>

                        <div style="width:20rem;flex-grow: 1;"
                            class="tbl-td d-none d-lg-flex">
                            <span class="text-overflow-ellipsis">{{ installer.address }}</span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td full-width">
                            <span class="text-overflow-ellipsis">{{ installer.tax_identifier_type }}</span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td full-width">
                            <span class="text-overflow-ellipsis"> {{ installer.electrical_licence_number }}</span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td full-width">
                            <span class="text-overflow-ellipsis"> {{ installer.cec_accreditation_number }}</span>
                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td full-width">
                            <span class="text-overflow-ellipsis"> {{ installer.workmanship_warranty }}</span>
                        </div>

                        <div style="width:10rem;"
                            class="tbl-td d-none d-lg-flex">{{ installer.updated_at }}</div>

                        <div style="width:10rem;"
                            class="tbl-td d-none d-lg-flex">{{ installer.created_at }}</div>
                    </div>

                    <DataTableSkeletor v-if="isFirstLoading" />

                    <DataNotFound v-if="!isFirstLoading && !fetchInstallers.length" />



                </datatable-body>

            </Datatable>
        </div>
    </section>
</template>

<style scoped
    lang="scss">
    .installer-list:deep(.content-body-) {
        .tbl-custom-data-table {
            height: calc(100vh - 106px) !important;
        }

        .tbl-body .tbl-tr .tbl-td {
            padding-top: 2px !important;
            padding-bottom: 2px !important;
        }

        .search-bar {
            .form-control {
                padding-left: 2rem;
                border-color: #dddddd;
            }
        }

        .search-bar-icon {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-43%);
        }
    }
</style>