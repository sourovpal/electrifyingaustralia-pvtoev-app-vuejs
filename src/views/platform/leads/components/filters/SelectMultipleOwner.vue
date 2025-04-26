<script setup>
  import { ref, watch, computed } from "vue";
  import MakeDropdown from "./MakeDropdown.vue";
  import { usePlatformStore, useLeadsStore } from "@stores";

  const platformStore = usePlatformStore();
  const leadsStore = useLeadsStore();

  const filterQuerys = computed(() => leadsStore.getFilterQuerys);
  const owners = computed(() => platformStore.getUsers);

  const selected_owners = ref([]);
  const owner_list = ref([]);

  watch(owners, () => {

    Object.assign(owner_list.value, [{
      user_id: 0,
      name: 'No Owner'
    }].concat(owners.value));

  });

  function selectOwnerHandler(toggle) {
    let owners_id = selected_owners.value.map(item => item.user_id);

    if (!owners_id.length || !toggle) {
      selected_owners.value = [];
      return delete filterQuerys.value['owners'];
    }

    filterQuerys.value['owners'] = owners_id;

  }

</script>

<template>
  <make-dropdown title="Owners"
    @toggle="selectOwnerHandler">

    <template #icon>
      <i class="fs-16px pi pi-user"></i>
    </template>

    <MultiSelect v-model="selected_owners"
      :options="owner_list"
      optionLabel="name"
      filter
      :filterFields="['name', 'email']"
      @change="selectOwnerHandler"
      placeholder="Select Owners"
      :maxSelectedLabels="1"
      size="small"
      class="w-100"
      overlayClass="multi-select-overlay-small">
    </MultiSelect>

  </make-dropdown>
</template>