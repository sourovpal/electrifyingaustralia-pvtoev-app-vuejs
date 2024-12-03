<script setup>

import { computed, watch, ref } from 'vue';
import { usePlatformStore } from '@stores';
import { useDebounceFn } from '@vueuse/core';
import { useApiRequest } from '@actions';
import { $toast } from '@config';

// store instance
const platformStore = usePlatformStore();

// computed life cycle
const teamMembers = computed(() => platformStore.getLeadTeamMembers);
const editLeadId = computed(() => platformStore.getEditLeadId);
const users = computed(() => platformStore.getUsers);

const popovarRef = ref(null);
const groupMembers = ref([]);
const othersMembers = ref([]);
const search = ref(null);

watch(teamMembers, (members) => {

    let limit = 3;

    if (teamMembers.value.length <= limit) {

        groupMembers.value = [...members];
        othersMembers.value = '+';

    } else {

        groupMembers.value = [...members].splice(0, limit);
        othersMembers.value = `+${teamMembers.value.length - limit}`;
    }

}, { immediate: true, deep: true });


function handleTogglePopovar(event) {
    search.value = null;
    popovarRef.value.toggle(event);
}

function isTeamMember(member) {
    return teamMembers.value?.some(item => (item.user_id == member.user_id));
}

const onSubmitTeamMembers = async (member) => {
    $toast.clear();

    await useApiRequest({
        url: `/platform/deals/${editLeadId.value}/team-members`,
        method: 'put',
        payload: {
            user_id:member.user_id
        },
    }).then(res => {

        const { success, message } = res;

        if (!success)
            return $toast.error(message.text);
        
        handleToggleTeamMember(member);
        platformStore.callFetchTimelineLogs();

    }).catch(error => {
        $toast.error(error.message.text)
    });
}


const filterUsers = computed(() => {

    if (!search) return users.value;

    return users.value?.filter((user) => {

        if (user.name?.toLowerCase()?.search(search.value?.toLowerCase()) > -1 || user.email?.toLowerCase()?.search(search.value?.toLowerCase()) > -1)
            return user;
    });
});

function handleToggleTeamMember(member) {

    let index = teamMembers.value?.findIndex(item => item.user_id == member.user_id);
    let members = [];

    if (index > -1) {
        members = teamMembers.value?.filter((item) => item.user_id != member.user_id);
        platformStore.setLeadTeamMembers([...members]);
    } else {
        platformStore.setLeadTeamMembers([...teamMembers.value.concat(member)]);
    }

}

</script>

<template>
    <avatar-group>

        <Avatar v-for="(member, index) in groupMembers" :key="index" :image="member.profile_avatar"
            v-tippy="{ content: member.name || member.email, placement: 'top' }" size="small" shape="circle"
            class="me-1" style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;" />

        <Avatar :label="othersMembers" class="cursor-pointer fw-bold" shape="circle" size="small"
            style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;" @click="popovarRef?.toggle"
            v-tippy="{ content: 'Team Members', placement: 'top' }" />

    </avatar-group>


    <Popover ref="popovarRef"
        style="--p-popover-arrow-offset:0.6rem; --p-popover-content-padding:0.6rem 0rem; max-width:16rem;">

        <div class="">

            <div class="mb-2 px-3">

                <span class="fs-14px mb-2">Filter Member</span>

                <icon-field>

                    <input-text class="w-100" style="--p-inputtext-sm-padding-y:0.175rem;" size="small" v-model="search"
                        placeholder="Search name or email"></input-text>

                    <input-icon class="pi pi-search fs-16px" />

                </icon-field>

            </div>

            <div>

                <span class="fs-14px d-block px-3">Team Members</span>

                <ul class="list-unstyled m-0 " style="max-height: 22rem; overflow: auto;">

                    <li v-for="member in filterUsers" :key="member.name"
                        class="d-flex flex-row justify-context-start align-items-center px-3 py-1 dropdown-item">

                        <div class="me-2">
                            <custom-checkbox @click="onSubmitTeamMembers(member)" :checked="isTeamMember(member)"
                                class="btn-sm"></custom-checkbox>
                        </div>

                        <Avatar :image="member.profile_avatar" size="small" shape="circle" class="me-2"
                            style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;min-width: var(--p-avatar-width);" />

                        <div class="attributes">
                            <span class="fs-14px">{{ member.name || 'Unknown name' }}</span>
                            <div class="fs-14px text-soft">{{ member.email }}</div>
                        </div>

                    </li>

                    <li v-if="!filterUsers.length" class="text-soft fs-14px px-3">
                        No available members
                    </li>

                </ul>

            </div>

        </div>

    </Popover>

</template>

<style scoped lang="scss">
.attributes {
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    div {
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>