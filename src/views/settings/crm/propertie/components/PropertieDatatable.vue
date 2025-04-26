<script setup>
    import Datatable from '@components/Datatable/Datatable.vue';
    import DatatableHeader from '@components/Datatable/DatatableHeader.vue';
    import DatatableBody from '@components/Datatable/DatatableBody.vue';
    import PropetiesSkeletor from './PropetiesSkeletor.vue';
    import { getCustomPropertieIcon, handleDateTimeFormat } from "@helpers";

    const props = defineProps({
        properties: { type: Array, default: [] },
        isLoading: { type: Boolean, default: false },
        isFirstLoading: { type: Boolean, default: false },
        selectedProperties: { type: Array, default: [] },
    });

    const emits = defineEmits(['checked', 'edit-propertie']);

</script>

<template>
    <div class="content-body- border-top">

        <Datatable>

            <datatable-header v-if="isLoading || properties.length">

                <div class="tbl-th"
                    style="width:3.46rem;"></div>
                <div class="tbl-th"
                    style="width:15rem;">Propertie</div>
                <div class="tbl-th "
                    style="width:15rem;">Unique ID</div>
                <div class="tbl-th"
                    style="width:10rem;flex-grow: 1;">Data Type</div>
                <div class="tbl-th"
                    style="width:10rem;flex-grow: 1;">Visibility</div>
                <div class="tbl-th"
                    style="width:15rem;flex-grow: 1;">Lead / Pipeline</div>
                <div class="tbl-th"
                    style="width:10rem;">Last Update</div>
                <div class="tbl-th"
                    style="width:10rem;">Created At</div>

            </datatable-header>
            <datatable-body>

                <PropetiesSkeletor v-if="isFirstLoading"></PropetiesSkeletor>

                <template v-if="!isLoading || properties.length">

                    <div v-for="(propertie, index) in properties"
                        :class="{'active':selectedProperties.includes(propertie.propertie_id)}"
                        :key="index"
                        class="tbl-tr full-width">

                        <div style="width:4rem;margin-left: -7px;"
                            class="tbl-td full-width">

                            <custom-checkbox @click="emits('checked', propertie.propertie_id)"
                                :checked="selectedProperties.includes(propertie.propertie_id)">
                            </custom-checkbox>

                        </div>

                        <div style="width:15rem;"
                            class="tbl-td">

                            <span class="text-overflow-ellipsis editable"
                                @click="emits('edit-propertie', propertie)">
                                {{ propertie.label }}
                            </span>

                        </div>

                        <div style="width:15rem;"
                            class="tbl-td">

                            <span class="text-overflow-ellipsis">
                                {{ propertie.unique_id }}
                            </span>

                        </div>

                        <div style="width:10rem;flex-grow: 1;"
                            class="tbl-td">

                            <span class="me-3">

                                <i class="fs-16px"
                                    :class="getCustomPropertieIcon(propertie.data_type_id)"></i>

                            </span>

                            <span class="text-overflow-ellipsis">
                                {{ propertie.data_type }}
                            </span>

                        </div>

                        <div style="width:10rem;flex-grow: 1;"
                            class="tbl-td d-none d-lg-flex">

                            <div class="ms-4">
                                <i v-if="propertie.visibility"
                                    class="pi pi-eye fs-18px"></i>

                                <i v-else
                                    class="pi pi-eye-slash fs-18px"></i>
                            </div>

                        </div>

                        <div style="width:15rem;flex-grow: 1;"
                            class="tbl-td d-none d-lg-flex">

                            <span class="text-overflow-ellipsis btn btn-sm btn-success py-0 px-2">
                                {{ propertie.pipeline_id?'Pipeline':'Lead'}}
                            </span>

                        </div>

                        <div style="width:10rem;"
                            class="tbl-td d-none d-lg-flex">
                            {{ handleDateTimeFormat(propertie.updated_at) }}
                        </div>

                        <div style="width:10rem;"
                            class="tbl-td d-none d-lg-flex">
                            {{ handleDateTimeFormat(propertie.created_at) }}
                        </div>

                    </div>

                </template>

            </datatable-body>

        </Datatable>

    </div>
</template>
<style scoped
    lang="scss">
    :deep(.tbl-custom-data-table) {
        height: calc(100vh - 105px) !important;
    }
    .editable{
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        &:hover{
            color: var(--crm-color);
        }
    }
</style>