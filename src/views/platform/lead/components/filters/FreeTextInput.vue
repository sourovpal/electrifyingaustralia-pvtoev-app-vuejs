<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  uniqueId: {
    type: String,
    default: "free_text",
  },
  modelValue: {
    default: '',
  },
  type: {
    type: String,
    default: "text",
  },
});

const emits = defineEmits(["change", "update:modelValue"]);
const currentValue = ref('');
const freeTextInputRef = ref();

watchEffect(() => {
  if (props.modelValue) {
    currentValue.value = props.modelValue;
  } else {
    currentValue.value = '';
  }
});

function onChangeHandler(e) {
  emits("update:modelValue", currentValue.value);
  emits("change", currentValue.value);
}
</script>

<template>
  <div ref="freeTextInputRef">
    <input
      v-if="type != 'textarea'"
      class="form-control form-control-sm fw-bold text-head"
      :type="type"
      :id="uniqueId"
      v-model="currentValue"
      @blur="onChangeHandler"
    />
    <textarea
      v-else
      class="form-control form-control-sm fw-bold text-head"
      type="text"
      rows="4"
      :id="uniqueId"
      v-model="currentValue"
      @blur="onChangeHandler"
    ></textarea>
  </div>
</template>