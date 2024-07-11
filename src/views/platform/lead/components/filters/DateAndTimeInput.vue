<script setup>
  import { ref, watchEffect } from "vue";

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
  });

  const emits = defineEmits(["change", "update:modelValue"]);
  const currentValue = ref(null);
  const dateTimeInputRef = ref();

  watchEffect(() => {
    if (props.modelValue) {
      currentValue.value = props.modelValue;
    } else {
      currentValue.value = null;
    }
  });

  function onChangeHandler(){
    emits('update:modelValue', currentValue.value);
    emits('change', currentValue.value);
  }

</script>

<template>
  <div ref="dateTimeInputRef">
    <input class="form-control form-control-sm fw-bold text-head"
      :type="type"
      :id="uniqueId"
      v-model="currentValue"
      @input="onChangeHandler" />
  </div>
</template>