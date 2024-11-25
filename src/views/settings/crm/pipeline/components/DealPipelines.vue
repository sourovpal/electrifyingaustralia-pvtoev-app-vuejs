<script setup>
    import { formatTimeAgo } from '@helpers';

    const props = defineProps({
        pipeline: { type: Object, default: {} },
        position: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    });

    const emits = defineEmits(['changePosition', 'handleDelete']);

</script>


<template>
    <div class="section-box d-flex justify-content-start align-items-center">

        <div class="card pipeline-card flex-grow-1">

            <div class="card-head d-flex justify-content-between align-items-center px-3">

                <div class="d-flex justify-content-start align-items-center">

                    <h5 class="mb-0">{{ pipeline.title }}</h5>

                    <font-awesome-icon v-if="pipeline.is_sales_pipeline"
                        icon="fas fa-sack-dollar"
                        class="fs-16px text-soft ms-2"></font-awesome-icon>

                </div>

                <div>

                    <router-link :to="pipeline.pipeline_id?`/settings/crm/pipeline/${pipeline.pipeline_id}/edit`:``"
                        class="btn btn-outline-primary edit-pipeline-btn fw-bold btn-sm">
                        Edit pipeline
                    </router-link>

                </div>
            </div>
            <div class="card-body flex-wrap d-flex justify-content-between align-items-center px-3">

                <div class="">

                    <span class="fs-14px text-soft">
                        Created {{ formatTimeAgo(pipeline.created_at, false) }} ·
                        {{ pipeline.stages_count }} stages
                    </span>

                </div>

                <div class="d-flex align-items-center flex-grow-1 justify-content-end">

                    <div class="d-none d-md-flex">

                        <router-link class="edit-custom-pro-btn text-soft fs-14px"
                            :to="pipeline.pipeline_id?`/settings/crm/propertie?pipeline_id=${pipeline.pipeline_id}&title=${pipeline.title}`:''">
                            Edit {{ pipeline.properties_count }} properties
                        </router-link>

                    </div>

                    <div class="ms-2">

                        <button data-mdb-toggle="dropdown"
                            class="btn btn-sm btn-transparent shadow-0 btn-floating d-flex justify-content-center align-items-center me-n2">
                            <font-awesome-icon icon="fas fa-ellipsis-vertical"
                                class="fs-14px text-soft"></font-awesome-icon>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">

                            <button class="dropdown-item py-1 fs-14px fw-bold text-head">Edit Pipeline</button>

                            <button @click="emits('handleDelete')"
                                class="mb-1 dropdown-item py-1 fs-14px fw-bold text-danger">Delete</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sorted-arrow">

            <button class="up mb-2 btn-light btn-floating"
                @click="emits('changePosition', 'up')"
                :disabled="position == 0">

                <font-awesome-icon icon="fas fa-arrow-up"
                    class="fs-16px text-soft ms-2"></font-awesome-icon>

            </button>

            <button class="down mb-0 mt-2 btn-light btn-floating"
                @click="emits('changePosition', 'down')"
                :disabled="position == (total - 1)">

                <font-awesome-icon icon="fas fa-arrow-down"
                    class="fs-16px text-soft ms-2"></font-awesome-icon>

            </button>

        </div>

    </div>
</template>


<style lang="scss"
    scoped>
    .btn-outline-primary:hover {
        background-color: rgba(29, 123, 255, 0.1);
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
                    border-color: var(--crm-color-6);
                    color: var(--crm-color-6);
                    &:hover{
                        background-color: var(--crm-color-1);
                        color: var(--crm-color-8);
                    }
                }
            }

            .card-body {
                background-color: whitesmoke;
                padding-top: 13px;
                padding-bottom: 13px;

                .edit-custom-pro-btn {
                    text-decoration: underline;
                    text-decoration-color:transparent;
                    &:hover{
                        text-decoration-color: var(--crm-color-6);
                    }
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

    .dropdown-menu.dropdown-menu-end {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px !important;
        border-radius: 3px !important;

        &::before {
            content: "";
            position: absolute;
            top: -7px;
            right: 10px;
            border: 7px solid #dedede;
            border-right-color: white;
            border-bottom-color: white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }

        &::after {
            content: "";
            position: absolute;
            top: -6px;
            right: 10px;
            border: 7px solid white;
            border-right-color: white;
            border-bottom-color: white;
            transform: rotate(45deg);
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
</style>