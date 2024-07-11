<script setup>
import { ref, watchEffect, defineProps, defineEmits } from "vue";
import MakeDropdown from "./MakeDropdown.vue";

const props = defineProps({
  title: {
    type: String,
    default: "date range",
  },
  icon: {
    type: String,
    default: "far fa-calendar-check",
  },
});
const fromDate = ref(null);
const toDate = ref(null);
const emits = defineEmits(["change", "update:modelValue"]);

function toggleHandler() {
  fromDate.value = null;
  toDate.value = null;
  setChange(null);
}

function onChangeHandler() {
  if (fromDate.value && toDate.value) {
    var range = { from_date: fromDate.value, to_date: toDate.value };
    setChange(range);
  } else {
    setChange(null);
  }
}
function setChange(range = null) {
    emits("update:modelValue", range);
    emits("change", range);
}
</script>

<template>
  <make-dropdown @toggle="toggleHandler" :title="title" :icon="icon">
    <div class="mb-2">
      <label class="fs-14px text-head" for="">From date:</label>
      <input
        class="form-control form-control-sm"
        type="date"
        @change="onChangeHandler()"
        v-model="fromDate"
      />
    </div>
    <div class="">
      <label class="fs-14px text-head" for="">To date:</label>
      <input
        class="form-control form-control-sm"
        type="date"
        @change="onChangeHandler()"
        v-model="toDate"
      />
    </div>
  </make-dropdown>
</template>