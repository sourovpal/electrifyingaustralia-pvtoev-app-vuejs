<script setup>

  import { computed, watch, ref } from 'vue';
  import { usePlatformStore } from '@stores';

  const props = defineProps({
    loading: { type: Boolean, default: false },
    member: { type: Object, default: null },
  });

  const emits = defineEmits(['change']);

  // store instance
  const platformStore = usePlatformStore();

  // computed life cycle
  const users = computed(() => platformStore.getUsers);

  const popovarRef = ref(null);
  const search = ref(null);

  function toggle(event) {

    if (!users.value?.length) {
      platformStore.callFetchUsers();
    }

    search.value = null;

    popovarRef.value.toggle(event);
  }

  const filterUsers = computed(() => {

    if (!search) return users.value;

    return users.value?.filter((user) => {

      if (user.name?.toLowerCase()?.search(search.value?.toLowerCase()) > -1 || user.email?.toLowerCase()?.search(search.value?.toLowerCase()) > -1)
        return user;
    });
  });

  defineExpose({
    toggle,
  });

</script>

<template>
  <Popover ref="popovarRef"
    class="team-members-popover"
    style="--p-popover-arrow-offset:0.6rem; --p-popover-content-padding:0.6rem 0rem;max-width:15rem;">

    <div class="">

      <div class="mb-2 px-3">

        <span class="fs-14px mb-2">Filter Member</span>

        <icon-field>

          <input-text class="w-100"
            style="--p-inputtext-sm-padding-y:0.175rem;"
            size="small"
            v-model="search"
            placeholder="Search name or email"></input-text>

          <input-icon class="pi pi-search fs-16px" />

        </icon-field>

      </div>


      <div v-if="member"
        class="border-bottom py-2 mt-n2">

        <span class="fs-14px d-block px-3">Primary Owner</span>

        <div class="d-flex flex-row justify-context-start align-items-center cursor-pointer dropdown-item px-3 py-1">

          <Avatar :image="member.profile_avatar"
            size="small"
            shape="circle"
            class="me-2"
            style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;min-width: var(--p-avatar-width);" />

          <div class="attributes">
            <span class="fs-14px">{{ member.name || 'Unknown name' }}</span>
            <div class="fs-14px text-soft">{{ member.email }}</div>
          </div>

        </div>

      </div>


      <div>

        <span class="fs-14px d-block px-3">Team Members</span>

        <ul class="list-unstyled m-0 "
          style="max-height:22rem;overflow: auto;">

          <template v-for="item in filterUsers"
            :key="item.user_id">

            <li v-if="!member || item.user_id != member?.user_id"
              @click="emits('change', item)"
              class="d-flex flex-row justify-context-start align-items-center cursor-pointer dropdown-item px-3 py-1">

              <Avatar :image="item.profile_avatar"
                size="small"
                shape="circle"
                class="me-2"
                style="--p-avatar-width:1.8rem;--p-avatar-height:1.8rem;min-width: var(--p-avatar-width);" />

              <div class="attributes">
                <span class="fs-14px">{{ item.name || 'Unknown name' }}</span>
                <div class="fs-14px text-soft">{{ item.email }}</div>
              </div>

            </li>

          </template>

          <li v-if="!filterUsers.length"
            class="text-soft fs-14px px-3">
            No available members
          </li>

        </ul>

      </div>

    </div>

  </Popover>

</template>

<style scoped
  lang="scss">
  .attributes {
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>