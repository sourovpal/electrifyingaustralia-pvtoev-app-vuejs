<script setup>
    import Datatable from '@components/Datatable/Datatable.vue';
    import DatatableHeader from '@components/Datatable/DatatableHeader.vue';
    import DatatableBody from '@components/Datatable/DatatableBody.vue';
    import RolesSkeletor from './RolesSkeletor.vue';
    import { ref,    } from 'vue';
    import { formatTimeAgo, handleDateTimeFormat } from '@helpers';

    const props = defineProps({
        roles: { type: Array, default: [] },
        selectedRows: { type: Array, default: [] },
        isFirstLoading: { type: Boolean, default: false },
        isLoading: { type: Boolean, default: false },
    });
    const emits = defineEmits(['handleSelectRows']);
</script>

<template>
    <Datatable>

        <datatable-header v-if="isFirstLoading || roles.length">
            <div class="tbl-th"
                style="width:3.46rem;"></div>
            <div class="tbl-th"
                style="width:15rem;flex-grow: 1;">Role Name</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:10rem;flex-grow: 1;">Assign Users</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:10rem;flex-grow: 1;">Assign Permissions</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:10rem;flex-grow: 1;">Last Update</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:10rem;flex-grow: 1;">Created At</div>
        </datatable-header>
        <datatable-body>
            <div v-if="!isFirstLoading || roles.length"
                :class="selectedRows.includes(role.id)?'active':''"
                class="tbl-tr full-width"
                v-for="(role, index) in roles"
                :key="index">

                <div style="width:4rem;margin-left: -7px;"
                    class="tbl-td full-width">
                    <custom-checkbox @click="emits('handleSelectRows', role.role_id)"
                        :checked="selectedRows.includes(role.user_id)" />
                </div>

                <div style="width:15rem;flex-grow: 1;"
                    class="tbl-td">
                    <router-link :to="`/settings/roles/${role.role_id}/edit`">
                        <span class="text-overflow-ellipsis">{{ role.name }}</span>
                    </router-link>
                </div>

                <div style="width:10rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis fw-bold btn btn-sm btn-success py-0 px-1">
                        {{ role.users_count }} +
                    </span>
                </div>

                <div style="width:10rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis fw-bold btn btn-sm btn-primary py-0 px-1">
                        {{ role.permissions_count }} +
                    </span>
                </div>

                <div style="width:10rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">{{ formatTimeAgo(role.updated_at) }}</div>

                <div style="width:10rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">{{ handleDateTimeFormat(role.created_at) }}</div>
            </div>

            <RolesSkeletor v-if="isFirstLoading" />

        </datatable-body>

    </Datatable>
</template>