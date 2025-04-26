<script setup>
    import { ref, computed, watchEffect, nextTick, watch, onMounted } from 'vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import TableRefreshSpinner from '@components/Datatable/TableRefreshSpinner.vue';
    import { Skeletor } from 'vue-skeletor';
    import { AvatarIcon } from "@assets/icons";
    import { usePlatformStore, usePipelineStore } from "@stores";
    import { useDebounceFn } from '@vueuse/core';
    import { useRouter, useRoute } from 'vue-router';
    import { delay } from '@helpers';

    const router = useRouter();
    const route = useRoute();
    const platformStore = usePlatformStore();
    const pipelineStore = usePipelineStore();
    const searchInput = ref(null);
    const viewStage = ref(['column', 'row']);
    const toggleOrder = ref('DESC');
    const selectedOrder = ref({});

    // Computed
    const isLoading = computed(() => pipelineStore.getIsLoading);
    const isFirstLoading = computed(() => pipelineStore.getIsFirstLoading);
    const toggleFilter = computed(() => pipelineStore.getToggleFilter);
    const filterQuerys = computed(() => pipelineStore.getFilterQuerys);
    const pipeline = computed(() => pipelineStore.getPipeline);
    const orderBy = computed(() => pipelineStore.getOrderBy);
    const orderColumn = computed(() => pipelineStore.getOrderColumn);

    const descendingOrderList = ref([
        {
            title: 'Most recently updated first',
            column: 'updated_at',
            order: 'DESC',
        },
        {
            title: 'Most recently created first',
            column: 'created_at',
            order: 'DESC',
        },
        {
            title: 'Most valuable first',
            column: 'estimated_value',
            order: 'DESC',
        },
        {
            title: 'Most stars first',
            column: 'confidence',
            order: 'DESC',
        },
    ]);

    const ascendingOrderList = ref([
        {
            title: 'Least recently updated first',
            column: 'updated_at',
            order: 'ASC',
        },
        {
            title: 'Least recently created first',
            column: 'created_at',
            order: 'ASC',
        },
        {
            title: 'Least valuable first',
            column: 'estimated_value',
            order: 'ASC',
        },
        {
            title: 'Least stars first',
            column: 'confidence',
            order: 'ASC',
        },
    ]);

    const pipelineView = computed(() => {
        let view = route.query.view;
        if (viewStage.value.includes(view)) {
            pipelineStore.setPipelineView(view);
            return view;
        } else {
            pipelineStore.setPipelineView();
            return pipelineStore.getPipelineView;
        }
    });

    const handleSearch = useDebounceFn(() => {
        pipelineStore.setSearchQuery(searchInput.value);
    }, 1000);

    const handleRefresh = useDebounceFn(() => {
        router.push({ path: '/platform/deals', query: { pipeline: pipelineStore.getPipelineId } });
        pipelineStore.setFilterQuerys({});
        pipelineStore.setIsFirstLoading(true);
        pipelineStore.setPipeline({});
        pipelineStore.setOrderBy();
        pipelineStore.setOrderColumn();
        pipelineStore.setPipelinePrimaryStages([]);
        pipelineStore.setPipelineSuccessStages([]);
        pipelineStore.setPipelineLostStages([]);
        pipelineStore.callFetchPipeline(pipelineStore.getPipelineId);
    }, 500);

    async function handleToggleFilter() {

        if (!platformStore.getSources?.length) {
            platformStore.callFetchSources();
        }

        if (!platformStore.getUsers?.length) {
            platformStore.callFetchUsers();
        }

        if (toggleFilter.value && Object.keys(filterQuerys.value).length) {

            pipelineStore.setFilterQuerys({});
            pipelineStore.setToggleFilter(false);

            await delay(500);
            pipelineStore.setToggleFilter('render')

            await delay(200);
            pipelineStore.setToggleFilter(false);
        } else {
            pipelineStore.setToggleFilter(!toggleFilter.value);
        }
    }

    const handleOrder = (order) => {
        selectedOrder.value = order;
        pipelineStore.setOrderBy(order.order);
        pipelineStore.setOrderColumn(order.column);
    }

    onMounted(() => {
        selectedOrder.value = descendingOrderList.value[0];
    });


</script>

<template>
    <action-bar>
        <left-action-bar>

            <div class="pipeline-title ms-3 me-3">

                <Skeletor v-if="isFirstLoading"
                    style="width:4rem;height:1rem;"></Skeletor>

                <h5 v-else class="fs-20px fw-bold text-soft mb-0">{{ pipeline?.title }}</h5>

            </div>

            <!-- <div class="search-bar w-100 d-lg-inline d-none me-4">

                <div class="position-relative ms-4 w-100">

                    <input type="text"
                        v-model="searchInput"
                        class="form-control ps-5"
                        placeholder="Search keywords..."
                        @keyup="handleSearch()" />

                    <font-awesome-icon icon="fas fa-search"
                        class="ms-3 search-icon text-soft"></font-awesome-icon>

                </div>

            </div> -->

            <TableRefreshSpinner @click="handleRefresh"
                :loading="isLoading"></TableRefreshSpinner>

            <div class="d-lg-flex justify-content-center align-items-center d-none">

                <router-link :to="{query:{...route.query, view:'column'}}"
                    class="me-1">
                    <circle-button>
                        <material-icon name="view_column"
                            size="22" type="outlined"
                            :class="{
                                'text-primary':pipelineView === 'column', 
                                'text-soft': pipelineView != 'column'
                            }">
                        </material-icon>
                    </circle-button>
                </router-link>

                <router-link :to="{query:{...route.query, view:'row'}}"
                    class="ms-2">
                    <circle-button>
                        <material-icon name="table_rows"
                            size="20" type="outlined"
                            :class="{
                                'text-primary':pipelineView === 'row', 
                                'text-soft': pipelineView != 'row'
                            }">
                        </material-icon>
                    </circle-button>
                </router-link>

            </div>
        </left-action-bar>

        <right-action-bar>

            <div class="btn-group me-3"
                v-if="Object.keys(filterQuerys).length">

                <button class="btn btn-success btn-sm">
                    {{ Object.keys(filterQuerys).length }} active filter
                </button>

                <button @click="handleToggleFilter"
                    class="btn btn-success btn-sm px-2 active d-flex justify-content-center align-items-center">

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

                <circle-button v-tippy="{ content: 'Filter Leads', placement: 'top' }"
                    @click="handleToggleFilter"
                    class="btn btn-light btn-floating me-3 d-flex justify-content-center align-items-center">

                    <material-icon name="filter_alt"
                        size="20" />

                </circle-button>

            </div>

            <div class="me-3">

                <button data-mdb-toggle="dropdown"
                    class="btn btn-sm btn-light fw-bold border sorted-btn d-flex justify-content-between align-items-center">

                    <font-awesome-icon icon="fas fa-bars-staggered"
                        class="fs-15px text-head me-2"></font-awesome-icon>
                    {{ selectedOrder.title }}

                </button>

                <div @click.stop=""
                    class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu manage-order"
                    style="min-width:18rem;">

                    <div class="d-flex justify-content-between align-items-center px-2 py-1 mb-2">

                        <button class="btn btn-sm btn-outline-primary"
                            :class="{active:toggleOrder == 'DESC'}"
                            @click="toggleOrder = 'DESC'">
                            Descending
                        </button>

                        <button class="btn btn-sm btn-outline-primary"
                            :class="{active:toggleOrder == 'ASC'}"
                            @click="toggleOrder = 'ASC'">
                            Ascending
                        </button>

                    </div>

                    <div class="dropdown-item py-2 fw-bold cursor-pointer"
                        v-for="(item, index) in toggleOrder == 'DESC'? descendingOrderList : ascendingOrderList"
                        :class="{active:(selectedOrder.column == item.column && selectedOrder.order == item.order)}"
                        @click="handleOrder(item)"
                        :key="index">
                        {{ item.title }}
                    </div>

                    <hr class="m-0">

                    <div class="dropdown-item py-2 fw-bold cursor-pointer"
                        @click="handleOrder(descendingOrderList[0])">Manual</div>

                </div>

            </div>

            <div class="me-3 d-lg-inline d-xl-none">

                <button class=" btn btn-light btn-floating"
                    data-mdb-toggle="dropdown">

                    <font-awesome-icon icon="fas fa-ellipsis-vertical"></font-awesome-icon>

                </button>

                <div class="dropdown-menu dropdown-menu-end shadow-md custom-dropdown-menu three-dot">

                    <span @click="handleToggleFilter"
                        class="dropdown-item cursor-pointer text-head py-1">Filter Deals</span>

                    <router-link :to="{query:{...route.query, view:'column'}}"
                        class="dropdown-item cursor-pointer text-head py-1"
                        :class="{'text-primary':pipelineView === 'column'}">View Column</router-link>

                    <router-link :to="{query:{...route.query, view:'row'}}"
                        class="dropdown-item cursor-pointer text-head py-1"
                        :class="{'text-primary':pipelineView === 'row'}">View Row</router-link>
                </div>

            </div>

        </right-action-bar>

    </action-bar>

</template>

<style lang="scss"
    scoped>
    .manage-order {
        button {
            border: 0.122rem solid #a9d8ff !important;
            padding: 2px 16px;

            &.active {
                border: 0.122rem solid #007ee5 !important;
            }
        }

        .dropdown-item.active {
            border-left: 3px solid rgb(29, 150, 242);
        }
    }

    .pipeline-title {
        max-width: 15rem;

        h5 {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

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