<script setup>
    import { ref, } from 'vue';
    import TableRefreshSpinner from '@components/Datatable/TableRefreshSpinner.vue';
    import TablePagination from '@components/Datatable/TablePagination.vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import { usePlatformStore } from "@stores";

    const platformStore = usePlatformStore();

    const props = defineProps({
        pagination: { type: Object },
        isLoading: { type: Boolean, default: false }
    });

    const emits = defineEmits(['search:update', 'pagination:fetch']);

    const searchTasks = ref(null);
    const userIsLoading = ref(false);

    function handleFetch(payload = {}) {
        emits('pagination:fetch', { page: 1, ...payload });
    }

</script>

<template>
    <ActionBar>
        <left-action-bar>

            <table-refresh-spinner @click="handleFetch()"
                :loading="isLoading"/>

            <div class="search-bar w-100">

                <div class="position-relative ms-4 w-100">

                    <input type="text"
                        class="form-control ps-5"
                        placeholder="Search keywords..."
                        v-model="searchTasks"
                        @keyup="emits('search:update', searchTasks)" />

                    <font-awesome-icon icon="fas fa-search"
                        class="ms-3 search-icon text-soft" />

                </div>

            </div>

        </left-action-bar>

        <right-action-bar>

            <table-pagination :pagination="pagination"
                @change="page => handleFetch({page})"/>

        </right-action-bar>
    </ActionBar>
</template>
<style scoped
    lang="scss">
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

    .owner-dropdown-toggler {
        cursor: pointer;
        width: auto !important;
        border: none;
        outline: none;
        padding: 3px 25px 3px 0px;
        background-color: transparent;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
            content: "";
            position: absolute;
            right: 5px;
            top: 45%;
            transform: translateY(-50%) rotate(45deg);
            border: 0.25rem solid transparent;
            border-bottom-color: rgb(164, 164, 164);
            border-right-color: rgb(164, 164, 164);
        }

        .icon {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>