<script setup>
import { defineProps, ref } from "vue";
import SlideUpDown from "vue-slide-up-down";
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  icon: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["toggle"]);
const isOpen = ref(false);

function toggleDropdownHandler() {
  isOpen.value = !isOpen.value;
  emits("toggle", isOpen.value);
}
</script>

<template>
  <div class="filter-option">
    <div
      class="option-header d-flex justify-content-between align-items-center"
      :class="{ active: isOpen }"
      @click="toggleDropdownHandler()"
    >
      <div class="d-flex justify-content-start align-items-center">
        <font-awesome-icon class="text-head me-3" :icon="icon" />
        <div class="title fw-bold text-head">{{ title }}</div>
      </div>
      <div class="right-icon">
        <font-awesome-icon
          style="width: 14px; height: 14px"
          class="text-soft"
          icon="fas fa-plus"
        />
      </div>
    </div>
    <slide-up-down :active="isOpen" :duration="300">
      <div class="option-body">
        <slot></slot>
      </div>
    </slide-up-down>
  </div>
</template>