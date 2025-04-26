<template>

  <make-dropdown :title="label"
    @toggle="handleChange">

    <template #icon>
      <i class="fs-16px me-3"
        :class="getCustomPropertieIcon(dataType)"></i>
    </template>

    <input-date class="w-100"
      size="small"
      date-format="mm/dd/yy"
      :show-time="dataType == 'date_and_time'"
      v-model="input_date"
      @date-select="handleChange"
      :placeholder="label"></input-date>

  </make-dropdown>

</template>

<script setup>
  import { ref, watch, computed, watchEffect } from 'vue';
  import MakeDropdown from "./MakeDropdown.vue";
  import { usePlatformStore, useLeadsStore } from "@stores";
  import { getCustomPropertieIcon } from "@helpers";
  import moment from 'moment';

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

  const input_date = ref();

  function handleChange(toggle) {

    if (!input_date.value || !toggle) {

      input_date.value = null;

      return delete filterQuerys.value[props.uniqueId];

    }

    if (props.dataType == 'date_and_time')
      filterQuerys.value[props.uniqueId] = moment(input_date.value).format('MM/DD/YYYY HH:mm');
    else
      filterQuerys.value[props.uniqueId] = moment(input_date.value).format('MM/DD/YYYY');

  }

</script>