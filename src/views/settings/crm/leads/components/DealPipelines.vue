<script setup>
    import { ref, onMounted } from 'vue';
    import DealPipelinesSkeletor from './DealPipelinesSkeletor.vue';
    import { useApiRequest } from '@actions';
    import { $toast } from '@config';
    import { formatTimeAgo } from '@helpers';

    // Reactive state
    const pipelines = ref([{ id: null, title: 'Example Pipeline', total_stages: 0, created_ago: '1 seconds ago', total_properties: 1 }]);
    const isLoading = ref(false);
    const isFirstLoading = ref(false);
    const isSubmitPipelineUpdate = ref(false);

    // Function to sort pipelines
    const sortedAction = (action, index, item) => {
        let i;
        if (action === 'up') {
            i = index - 1;
        } else {
            i = index + 1;
        }

        const prev = pipelines.value[i];
        if (prev) {
            pipelines.value[i] = item;
            pipelines.value[index] = prev;
            updateOrCreatePipelinesHandler();
        }
    };

    const updateOrCreatePipelinesHandler = async () => {
        $toast.clear();
        const res = await useApiRequest({
            url: '/pipelines/change-position',
            method: 'post',
            payload: {
                pipelines: pipelines.value?.map(item => item.pipeline_id)
            },
        }).then(res => {
            const { success, message, } = res;
            if (!success) {
                $toast.error(message.text);
            }
        }).catch(error => {
            $toast.error('Oops, something went wrong');
        }).finally(() => {
        });
    };

    // Function to fetch all pipelines
    const fetchAllPipeline = async () => {
        $toast.clear();
        isLoading.value = true;
        const res = await useApiRequest({
            url: 'pipelines',
        }).then(res => {
            const { success, message, pipelines: fetchedPipelines } = res;
            isFirstLoading.value = false;
            isLoading.value = false;
            if (success) {
                pipelines.value = fetchedPipelines;
            } else {
                $toast.error(message.text);
            }
        }).catch(error => {
            $toast.error('Oops, something went wrong');
        }).finally(() => {
        });
    };

    // Lifecycle hook
    onMounted(() => {
        isFirstLoading.value = true;
        fetchAllPipeline();
    });
</script>




<template>

    <div class="row">
        <div class="col-lg-2 col-12 mb-3 mb-lg-0">
            <div class="settings-group-header">
                <h2>Deal Pipelines</h2>
            </div>
        </div>

        <div class="col-lg-8 col-xl-5 col-12">
            <DealPipelinesSkeletor v-if="isFirstLoading" />
            <div v-else
                class="section-box d-flex justify-content-start align-items-center"
                v-for="(item, index) in pipelines"
                :key="index">
                <div class="card pipeline-card flex-grow-1">
                    <div class="card-head d-flex justify-content-between align-items-center px-3">
                        <div class="d-flex justify-content-start align-items-center">
                            <h5 class="mb-0">{{ item.title }}</h5>
                            <font-awesome-icon v-if="item.is_sales_pipeline==1"
                                icon="fas fa-sack-dollar"
                                class="fs-16px text-soft ms-2"></font-awesome-icon>
                        </div>
                        <div>
                            <router-link :to="item.pipeline_id?`/settings/crm/pipeline/${item.pipeline_id}`:``"
                                class="btn btn-outline-primary edit-pipeline-btn fw-bold btn-sm">
                                Edit pipeline
                            </router-link>
                        </div>
                    </div>
                    <div class="card-body flex-wrap d-flex justify-content-between align-items-center px-3">
                        <div class="">
                            <span class="time">
                                Created {{ formatTimeAgo(item.created_at, false) }} ·
                                {{ item.stages_count }} stages
                            </span>
                        </div>
                        <div class="d-flex align-items-center flex-grow-1 justify-content-end">
                            <div class="d-none d-md-flex">
                                <router-link class="edit-custom-pro-btn"
                                    :to="item.pipeline_id?`/settings/crm/properties?pipeline=${item.pipeline_id}&title=${item.title}`:''">
                                    Edit {{ item.properties_count }} properties
                                </router-link>
                            </div>
                            <div class="ms-2">
                                <button
                                    class="btn btn-sm btn-transparent shadow-0 btn-floating d-flex justify-content-center align-items-center">
                                    <font-awesome-icon icon="fas fa-ellipsis-vertical"
                                        class="fs-14px text-soft"></font-awesome-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sorted-arrow">
                    <button class="up mb-2 btn-light btn-floating"
                        @click="sortedAction('up', index, item)"
                        :disabled="index==0">
                        <font-awesome-icon icon="fas fa-arrow-up"
                            class="fs-16px text-soft ms-2"></font-awesome-icon>
                    </button>
                    <button class="down mb-0 mt-2 btn-light btn-floating"
                        @click="sortedAction('down', index, item)"
                        :disabled="index==pipelines.length - 1">
                        <font-awesome-icon icon="fas fa-arrow-down"
                            class="fs-16px text-soft ms-2"></font-awesome-icon>
                    </button>
                </div>
            </div>

            <div class="mt-3">
                <router-link to="/settings/crm/pipeline"
                    class="btn btn-primary fw-bold">Add new pipeline</router-link>
            </div>

        </div>
    </div>

</template>


<style lang="scss"
    scoped>
    .btn-outline-primary:hover {
        background-color: rgba(29, 123, 255, 0.1);
        ;
    }

    .section-box {
        margin-bottom: 20px;

        .pipeline-card {
            width: 90%;
            border-radius: 3px;
            box-shadow: rgb(9 30 66 / 7%) 0px 1px 1px, rgb(5 21 48 / 9%) 0px 0px 1px 1px;

            .card-head {
                padding-top: 13px;
                padding-bottom: 13px;

                .edit-pipeline-btn {
                    font-size: 10px;
                    border-width: 1px;
                }
            }

            .card-body {
                background-color: whitesmoke;
                padding-top: 13px;
                padding-bottom: 13px;

                .time {
                    font-size: 14px;
                    color: #929292;
                }

                .edit-custom-pro-btn {
                    font-size: 14px;
                    text-decoration: underline;
                    color: #838383;
                }

                .drop-down-action {
                    outline: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    margin-left: 10px;
                }
            }
        }

        .sorted-arrow {
            display: flex;
            flex-direction: column;

            button {
                border: none;
                outline: none;
                background-color: transparent;
                margin-bottom: 12px;
                padding: 0px 10px;

                svg {
                    width: 18px;
                    height: 18px;
                }

                &[disabled] {
                    opacity: .4 !important;
                    cursor: no-drop;
                }
            }
        }
    }

    .list-group {
        .add-new-lead-status {
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            cursor: pointer;
            font-size: 14px;
            background-color: #f2f2f2 !important;
        }
    }
</style>