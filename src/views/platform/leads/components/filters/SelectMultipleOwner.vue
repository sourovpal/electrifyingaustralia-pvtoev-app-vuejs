<script setup>
  import { defineProps, ref, watchEffect, computed } from "vue";
  import SlideUpDown from "vue-slide-up-down";
  import MakeDropdown from "./MakeDropdown.vue";
  import { usePlatformStore, useLeadsStore } from "@stores";

  const props = defineProps({
    modelValue: {}
  });
  const platformStore = usePlatformStore();
  const owners = computed(() => platformStore.getUsers);

  const emits = defineEmits(["change", "update:modelValue", 'toggle']);

  const selectedIds = ref([]);

  watchEffect(() => {
    if (typeof props.modelValue == "undefined") {
      selectedIds.value = [];
    }
  });

  function toggleDropdownHandler(toggle) {
    if (selectedIds.value?.length && !toggle) {
      selectedIds.value = [];
      selectOwnerHandler(-1);
    }
    emits("toggle", toggle);
  }

  function selectOwnerHandler(id) {
    var index = selectedIds.value.indexOf(id);
    if (index > -1) {
      selectedIds.value.splice(index, 1);
    } else {
      selectedIds.value.push(id);
    }
    emits("update:modelValue", selectedIds.value);
    emits("change", selectedIds.value);
  }

</script>

<template>
  <make-dropdown title="Owners"
    icon="fas fa-users"
    @toggle="toggleDropdownHandler">
    <div @click="selectOwnerHandler(0)"
      class="d-flex justify-content-start align-items-center py-1 check-label-propertis">
      <custom-checkbox :checked="selectedIds.includes(0)" />
      <span class="fs-14px ms-1">No Owner</span>
    </div>

    <div v-for="(owner, index) in owners"
      :key="index"
      @click="selectOwnerHandler(owner.user_id)"
      class="d-flex justify-content-start align-items-center py-1 check-label-propertis">
      <custom-checkbox :checked="selectedIds.includes(owner.user_id)" />
      <span class="fs-14px ms-1">{{ owner.name }}</span>
    </div>
  </make-dropdown>
</template>