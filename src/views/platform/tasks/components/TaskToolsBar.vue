<script setup>
    import { ref, } from 'vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import DropdownOwnerList from '../../components/dropdowns/DropdownOwnerList.vue';
    import { AvatarIcon } from "@assets/icons";
    import { usePlatformStore } from "@stores";
    import TableRefreshSpinner from '@components/Datatable/TableRefreshSpinner.vue';
    import TablePagination from '@components/Datatable/TablePagination.vue';

    const platformStore = usePlatformStore();
    const props = defineProps({
        pagination: { type: Object },
        isLoading: { type: Boolean, default: false }
    });
    const emits = defineEmits(['search:update', 'pagination:fetch']);
    const searchTasks = ref(null);
    const userIsLoading = ref(false);
    const owner = ref(null);

    async function getUsers() {
        if (!platformStore.getUsers?.length) {
            platformStore.callFetchUsers(function ({ loading }) {
                userIsLoading.value = loading;
            });
        }
    }

    function selectOwnerHandler(user) {
        owner.value = user;
        emits('pagination:fetch', { page: 1, owner_id: user?.user_id ?? null });
    }

</script>

<template>
    <ActionBar>
        <LeftActionBar>

            <table-refresh-spinner :loading="isLoading"
                @click="emits('pagination:fetch')"></table-refresh-spinner>

            <div class="search-bar ms-2">
                <icon-field>

                    <input-icon class="pi pi-search" />
                    <input-text type="text"
                        size="small"
                        style="width:18rem;"
                        placeholder="Search keywords..."
                        v-model="searchTasks"
                        @keyup="emits('search:update', searchTasks)" />
                </icon-field>
            </div>

        </LeftActionBar>
        <RightActionBar>


            <div class="me-3">
                <button @click="getUsers"
                    class="owner-dropdown-toggler"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                    v-tippy="{ content: owner ? owner.name: 'Filter Owner', placement: 'top' }">
                    <div class="icon">
                        <img v-if="owner?.user_id"
                            :src="owner?.profile_avatar"
                            alt="Profile" />
                        <img v-else
                            :src="AvatarIcon"
                            alt="Profile" />
                    </div>
                </button>
                <DropdownOwnerList :loading="userIsLoading"
                    @change="selectOwnerHandler" />
            </div>

            <table-pagination :pagination="pagination"
                @change="(_page)=> emits('pagination:fetch', { page: _page })"></table-pagination>

        </RightActionBar>
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