<template>

  <make-dropdown :title="label"
    @toggle="handleChange">

    <template #icon>
      <i class="fs-16px me-3"
        :class="getCustomPropertieIcon(dataType)"></i>
    </template>

    <input-text class="w-100"
      size="small"
      v-model="input_text"
      @input="handleChange"
      :placeholder="label"></input-text>

  </make-dropdown>

</template>

<script setup>
  import { ref, watch, computed, watchEffect } from 'vue';
  import MakeDropdown from "./MakeDropdown.vue";
  import { usePlatformStore, useLeadsStore } from "@stores";
  import { getCustomPropertieIcon } from "@helpers";

  const props = defineProps({
    uniqueId: {
      required: true,
      type: String,
      default: "free_text",
    },
    label: {
      required: true,
      type: String,
      default: "free_text",
    },
    modelValue: {
      default: '',
    },
    dataType: {
      type: String,
      default: "text",
    },
  });

  const leadsStore = useLeadsStore();
  const platformStore = usePlatformStore();

  const filterQuerys = computed(() => leadsStore.getFilterQuerys);

  const input_text = ref();

  function handleChange(toggle) {

    if (!input_text.value || !toggle) {

      input_text.value = null;

      return delete filterQuerys.value[props.uniqueId];

    }

    filterQuerys.value[props.uniqueId] = input_text.value;

  }

</script>