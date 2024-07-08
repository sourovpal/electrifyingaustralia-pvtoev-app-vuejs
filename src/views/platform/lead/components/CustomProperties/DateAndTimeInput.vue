<script setup>
import { onClickOutside } from "@vueuse/core";
import moment from "moment";
import { computed, ref, watchEffect } from "vue";

const props = defineProps({
  uniqueId: {
    type: String,
    default: "free_text",
  },
  modelValue: {
    default: null,
  },
  type: {
    type: String,
    default: "date",
  },
  label: {
    type: String,
    default: "Lable Name",
  },
});

const emits = defineEmits(["change", "update:modelValue"]);
const currentValue = ref(null);
const freeTextInputRef = ref();
const isEdit = ref(false);

watchEffect(() => {
  if (props.modelValue) {
    currentValue.value = props.modelValue;
  } else {
    currentValue.value = null;
  }
});

function onChangeHandler(e) {
  if (currentValue.value !== props.modelValue) {
    emits("update:modelValue", currentValue.value);
    emits("change", currentValue.value);
  }
  isEdit.value = false;
}
const getCurrentValue = computed(() => {
  if (
    currentValue.value &&
    currentValue.value !== null &&
    currentValue.value !== ""
  ) {
    if(props.type == 'date'){
        return moment(currentValue.value).format("MM/DD/YYYY")
    }else{
        return moment(currentValue.value).format("MM/DD/YYYY hh:mm A")
    }
    return "–";
  } else {
    return "–";
  }
});

onClickOutside(freeTextInputRef, (e) => {
  isEdit.value = false;
});
</script>

<template>
  <div ref="freeTextInputRef">
    <label class="fs-14px text-soft d-block" :for="uniqueId">{{ label }}</label>
    <div
      v-if="!isEdit"
      @click="isEdit = true"
      class="form-control form-control-sm text-overflow-ellipsis"
    >
      <span class="text-head fw-bold input-value-preview">
        {{ getCurrentValue }}
      </span>
    </div>
    <input
      v-else
      class="form-control form-control-sm fw-bold text-head"
      :type="type"
      :id="uniqueId"
      v-model="currentValue"
      @blur="onChangeHandler"
    />
  </div>
</template>
<style lang="scss" scoped>
.lead-propertie-input {
  .form-control {
    border-color: #bdbdbd !important;
    background-color: #f5f7fa;
    position: relative;

    &:read-only {
      cursor: pointer;
    }

    &:hover {
      background-color: #ffffff;
    }
  }
}
.text-overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>