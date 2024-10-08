<script setup>
    import Datatable from '@components/Datatable/Datatable.vue';
    import DatatableHeader from '@components/Datatable/DatatableHeader.vue';
    import DatatableBody from '@components/Datatable/DatatableBody.vue';
    import TeamMemberSkeletor from './TeamMemberSkeletor.vue';
    import { ref, defineProps, defineEmits } from 'vue';
    import { formatTimeAgo, handleDateTimeFormat } from '@helpers';

    const props = defineProps({
        teamMembers: { type: Array, default: [] },
        selectedRows: { type: Array, default: [] },
        isFirstLoading: { type: Boolean, default: false },
        isLoading: { type: Boolean, default: false },
    });
    const emits = defineEmits(['handleSelectRows', 'handleEditMember']);
</script>

<template>
    <Datatable>
        <datatable-header v-if="isFirstLoading || teamMembers.length">
            <div class="tbl-th"
                style="width:3.46rem;"></div>
            <div class="tbl-th"
                style="width:20rem;flex-grow:1;">Team member</div>
            <div class="tbl-th d-none d-sm-flex"
                style="width:10rem;flex-grow:1;">Access Role</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:10rem;flex-grow: 1;">Join Date</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:12rem;flex-grow: 1;">Display Name</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:12rem;flex-grow: 1;">Job Title</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:12rem;flex-grow: 1;">Phone (Office)</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:12rem;flex-grow: 1;">Phone (Mobile)</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:15rem;flex-grow: 1;">CRM User Type</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:15rem;flex-grow:1;">Last Update</div>
            <div class="tbl-th d-none d-lg-flex"
                style="width:15rem;flex-grow:1;">Created At</div>
        </datatable-header>
        <datatable-body>
            <TeamMemberSkeletor v-if="isFirstLoading"></TeamMemberSkeletor>
            <div v-else
                :class="selectedRows.includes(member.user_id)?'active':''"
                class="tbl-tr full-width"
                v-for="(member, index) in teamMembers"
                :key="index">

                <div style="width:4rem;margin-left: -7px;"
                    class="tbl-td full-width">
                    <custom-checkbox @click="emits('handleSelectRows', member.user_id)"
                        :checked="selectedRows.includes(member.user_id)" />
                </div>

                <div style="width:20rem;flex-grow:1;"
                    class="tbl-td">
                    <div @click="emits('handleEditMember', member)"
                        class="d-flex justify-content-between align-items-center cursor-pointer w-100 team-member-hover">
                        <div class="avatar-group">
                            <img class="avatar rounded-circle"
                                width="35"
                                height="35"
                                :src="member.profile_avatar" />
                        </div>
                        <div class="d-flex ms-2 w-100"
                            style="flex-direction: column;line-height: 15px;">
                            <span class="fs-14px fw-bold text-overflow-ellipsis w-85">{{ member.name }}</span>
                            <span class="fs-14px fw-bold- text-overflow-ellipsis w-85">{{ member.email }}</span>
                        </div>
                    </div>
                </div>

                <div style="width:10rem;flex-grow:1;"
                    class="tbl-td d-none d-sm-flex">
                    <span v-if="member.is_owner"
                        class="text-overflow-ellipsis btn btn-sm btn-primary py-0 px-2">{{ "Owner" }}</span>
                    <span v-else-if="member.roles?.length"
                        class="text-overflow-ellipsis btn btn-sm btn-success py-0 px-2">{{ member.roles[0].name
                        }}</span>
                    <span v-else
                        class="text-overflow-ellipsis btn btn-sm btn-danger py-0 px-2">{{ "Guest" }}</span>
                </div>

                <div style="width:10rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span v-if="!member.invited_at"
                        class="text-overflow-ellipsis btn btn-sm btn-warning py-0 px-2">
                        {{ 'Pending invitations' }}</span>
                    <span v-if="member.invited_at"
                        class="text-overflow-ellipsis btn btn-sm btn-success py-0 px-2">
                        {{ formatTimeAgo(member.invited_at, 30, 'Do MMMM, YYYY') }}</span>
                </div>

                <div style="width:12rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">{{ member.display_name??'Not added yet' }}</span>
                </div>

                <div style="width:12rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">{{ member.job_title??'Not added yet' }}</span>
                </div>

                <div style="width:12rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">{{ member.phone_office??'Not added yet' }}</span>
                </div>

                <div style="width:12rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">{{ member.phone_mobile??'Not added yet' }}</span>
                </div>

                <div style="width:15rem;flex-grow: 1;"
                    class="tbl-td d-none d-lg-flex">
                    <span class="text-overflow-ellipsis">{{ 'All Access' }}</span>
                </div>

                <div style="width:15rem;flex-grow:1;"
                    class="tbl-td d-none d-lg-flex">{{ formatTimeAgo(member.updated_at) }}</div>

                <div style="width:15rem;flex-grow:1;"
                    class="tbl-td d-none d-lg-flex">{{ handleDateTimeFormat(member.created_at) }}</div>
            </div>
        </datatable-body>
    </Datatable>
</template>