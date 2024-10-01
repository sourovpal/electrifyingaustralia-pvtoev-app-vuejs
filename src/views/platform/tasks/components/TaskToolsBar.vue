<script setup>
    import { ref, defineProps, defineEmits } from 'vue';
    import ActionBar from '@components/ActionBar/ActionBar.vue';
    import LeftActionBar from '@components/ActionBar/LeftActionBar.vue';
    import RightActionBar from '@components/ActionBar/RightActionBar.vue';
    import DropdownOwnerList from '../../components/dropdowns/DropdownOwnerList.vue';
    import { AvatarIcon } from "@assets/icons";
    import { usePlatformStore } from "@stores";

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
        if(!platformStore.getUsers?.length){
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
            <div class="ms-3">
                <button @click="emits('pagination:fetch')"
                    :disabled="isLoading"
                    type="button"
                    class="toolbar-btn btn btn-sm btn-light btn-lg btn-floating">
                    <svg-custom-icon v-if="!isLoading"
                        icon="loader-icon" />
                    <svg-custom-icon v-else
                        icon="spinner-icon" />
                </button>
            </div>
            <div class="search-bar w-100">
                <div class="position-relative ms-4 w-100">
                    <input type="text"
                        class="form-control ps-5"
                        placeholder="Search keywords..."
                        v-model="searchTasks"
                        @keyup="emits('search:update', searchTasks)" />
                    <font-awesome-icon icon="fas fa-search"
                        class="ms-3 search-icon text-soft"></font-awesome-icon>
                </div>
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
            <div class="me-3"
                style="min-width:4rem;">
                <span>{{ pagination?.from??0 }} - {{ pagination?.to??0 }} of {{ pagination?.total??0 }}</span>
            </div>
            <button :disabled="!pagination?.prev_page || isLoading"
                @click="pagination?.prev_page && emits('pagination:fetch', { page: pagination?.prev_page })"
                v-tippy="{ content: 'Previous', placement: 'top' }"
                class="toolbar-btn btn btn-light btn-floating me-3">
                <font-awesome-icon icon="fas fa-arrow-left"
                    class="text-soft fs-16px"></font-awesome-icon>
            </button>

            <button :disabled="!pagination?.next_page || isLoading"
                v-tippy="{ content: 'Next', placement: 'top' }"
                @click="pagination?.next_page && emits('pagination:fetch', { page: pagination?.next_page })"
                class="toolbar-btn btn btn-light btn-floating me-3">
                <font-awesome-icon icon="fas fa-arrow-right"
                    class="text-soft fs-16px"></font-awesome-icon>
            </button>
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