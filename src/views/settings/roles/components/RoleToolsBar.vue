<script setup>
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import { ref } from 'vue';

    const props = defineProps({
        roles: { type: Array, default: [] },
        selectedRows: { type: Array, default: [] },
        pagination: { type: Object, default: {} },
        isFirstLoading: { type: Boolean, default: false },
        isLoading: { type: Boolean, default: false },
    });

    const emits = defineEmits(['pagination', 'selectAllRows', 'addNew', 'delete']);

</script>
<template>

    <action-bar>

        <left-action-bar>
            
            <div class="ps-2">

                <custom-checkbox @click="emits('selectAllRows', true)"
                    :checked="!!(roles.length && roles.length === selectedRows.length)"
                    :reset="!!(selectedRows.length && roles.length !== selectedRows.length)">
                </custom-checkbox>

            </div>
            
            <div>

                <button :disabled="isLoading"
                    @click="emits('pagination', {page:1})"
                    class="toolbar-btn btn btn-light btn-floating me-3 ms-3">

                    <svg-custom-icon v-if="isLoading"
                        icon="spinner-icon" />

                    <svg-custom-icon v-else
                        icon="loader-icon" />
                </button>

            </div>

            <div>

                <button class="toolbar-btn btn btn-danger btn-sm me-3 ms-3"
                    v-if="selectedRows.length"
                    @click="emits('delete')"
                    >

                    <span class="fs-12px">{{ selectedRows.length }} selected</span>

                    <font-awesome-icon icon="fas fa-trash"
                        class="ms-2"></font-awesome-icon>

                </button>

            </div>

        </left-action-bar>

        <right-action-bar>

            <div class="me-3">

                <button @click="emits('addNew', true)"
                    class="btn btn-primary fw-bold btn-sm">

                    <font-awesome-icon icon="fas fa-user-plus"
                        class="me-2"></font-awesome-icon>

                    Add New
                </button>

            </div>

            <div class="fw-bold d-flex justify-content-center align-items-center me-3 text-overflow-ellipsis fs-16px"
                style="min-width: 4rem;">
                {{ pagination.from??0 }} - {{ pagination.to??0 }} of {{ pagination.total??0 }}
            </div>

            <div class="">

                <button :disabled="!pagination?.prev_page || isLoading"
                    @click="emits('pagination', { page: pagination?.prev_page })"
                    v-tippy="{ content: 'Previous', placement: 'top' }"
                    class="toolbar-btn btn btn-light btn-floating me-3">

                    <font-awesome-icon icon="fas fa-arrow-left"
                        class="text-head fs-16px"></font-awesome-icon>

                </button>

                <button :disabled="!pagination?.next_page || isLoading"
                    v-tippy="{ content: 'Next', placement: 'top' }"
                    @click="emits('pagination', { page: pagination?.next_page })"
                    class="toolbar-btn btn btn-light btn-floating me-3">

                    <font-awesome-icon icon="fas fa-arrow-right"
                        class="text-head fs-16px"></font-awesome-icon>

                </button>

            </div>

        </right-action-bar>

    </action-bar>

</template>