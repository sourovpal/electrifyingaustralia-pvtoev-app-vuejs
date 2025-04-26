<script setup>
  import { ref, reactive, computed } from "vue";
  import MakeDropdown from "./MakeDropdown.vue";
  import moment from 'moment';
  import {usePipelineStore } from "@stores";

  const pipelineStore = usePipelineStore();

  const filterQuerys = computed(() => pipelineStore.getFilterQuerys);

  const props = defineProps({
    title: {
      type: String,
      default: "date range",
    },
    columnName: { required: true, type: String },
  });

  const range = reactive({
    from_date: null,
    to_date: null,
  });

  function onChangeHandler(toggle) {

    if (!toggle) {

      range.from_date = null;
      range.to_date = null;

      return delete filterQuerys.value[props.columnName];

    } else if (!range.from_date || !range.to_date) {
      return;
    }

    let date = {
      from_date: moment(range.from_date).format("YYYY-MM-DD"),
      to_date: moment(range.to_date).format("YYYY-MM-DD"),
    }

    filterQuerys.value[props.columnName] = date;

  }

</script>

<template>

  <make-dropdown @toggle="onChangeHandler"
    :title="title">

    <template #icon>
      <i class="pi pi-calendar-plus fs-16px me-3"></i>
    </template>

    <div class="mb-2">

      <label class="fs-14px text-head"
        for="">From Date:</label>

      <input-date v-model="range.from_date"
        size="small"
        class="w-100"
        dateFormat="dd-mm-yy"
        @date-select="onChangeHandler" />

    </div>

    <div class="">

      <label class="fs-14px text-head"
        for="">To Date:</label>

      <input-date v-model="range.to_date"
        size="small"
        class="w-100"
        dateFormat="dd-mm-yy"
        @date-select="onChangeHandler" />

    </div>

  </make-dropdown>

</template>