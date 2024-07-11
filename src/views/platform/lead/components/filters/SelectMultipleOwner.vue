<script setup>
import { defineProps, ref } from "vue";
import SlideUpDown from "vue-slide-up-down";
import MakeDropdown from "./MakeDropdown.vue";
const props = defineProps({
  owners: {
    type: Array,
    default: [],
  },
});
const emits = defineEmits(["change", "update:modelValue"]);
const selectedIds = ref([]);

function toggleDropdownHandler(toggle) {
  if (selectedIds.value?.length && !toggle) {
    selectedIds.value = [];
    selectOwnerHandler(-1);
  }
}

function selectOwnerHandler(id) {
  var index = selectedIds.value.indexOf(id);
  if (index > -1) {
    selectedIds.value.splice(index, 1);
  } else {
    if (id > -1) {
      selectedIds.value.push(id);
    }
  }
  emits("update:modelValue", selectedIds.value);
  emits("change", selectedIds.value);
}
</script>

<template>
  <make-dropdown
    title="Owners"
    icon="fas fa-users"
    @toggle="toggleDropdownHandler"
  >
    <label
      @click="selectOwnerHandler(0)"
      class="d-flex justify-content-start align-items-center py-1 check-label-propertis"
    >
      <custom-checkbox :checked="selectedIds.includes(0)" />
      <span class="fs-14px ms-1">No Owner</span>
    </label>

    <label
      v-for="(owner, index) in owners"
      :key="index"
      @click="selectOwnerHandler(owner.id)"
      class="d-flex justify-content-start align-items-center py-1 check-label-propertis"
    >
      <custom-checkbox :checked="selectedIds.includes(owner.id)" />
      <span class="fs-14px ms-1">{{ owner.name }}</span>
    </label>
  </make-dropdown>
</template>