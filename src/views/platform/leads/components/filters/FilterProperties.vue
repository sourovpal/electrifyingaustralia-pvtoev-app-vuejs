<script setup>
  import { ref, computed } from "vue";
  import SlideUpDown from "vue-slide-up-down";
  import FreeTextInput from "./FreeTextInput.vue";
  import DateAndTimeInput from "./DateAndTimeInput.vue";
  import MultipleChooseInput from "./MultipleChooseInput.vue";
  import SingleChooseInput from "./SingleChooseInput.vue";
  import YesOrNoInput from "./YesOrNoInput.vue";

  import { usePlatformStore, useLeadsStore } from "@stores";
  const platformStore = usePlatformStore();

  const leadProperties = computed(() => platformStore.getLeadProperties);

</script>

<template>
  <div class="filter-option"
    v-for="(propertie, index) in leadProperties"
    :key="index">

    <free-text-input :data-type="propertie?.data_type_id"
      v-if="propertie?.data_type_id === 'free_text' || 
      propertie?.data_type_id === 'multiline_free_text' || 
      propertie?.data_type_id === 'real_number'"
      :unique-id="propertie.unique_id"
      :label="propertie.label"></free-text-input>

    <date-and-time-input :data-type="propertie?.data_type_id"
      v-if="propertie?.data_type_id === 'date' || propertie?.data_type_id === 'date_and_time'"
      :unique-id="propertie.unique_id"
      :label="propertie.label"></date-and-time-input>

    <single-choose-input :data-type="propertie?.data_type_id"
      v-if="propertie?.data_type_id === 'single_choice'"
      :unique-id="propertie.unique_id"
      :label="propertie.label"
      :options="propertie.options"></single-choose-input>

    <multiple-choose-input :data-type="propertie?.data_type_id"
      v-if="propertie?.data_type_id === 'multiple_choice'"
      :unique-id="propertie.unique_id"
      :label="propertie.label"
      :options="propertie.options"></multiple-choose-input>

    <!-- <date-and-time-input v-else-if="propertie?.data_type_id === 'date' || propertie?.data_type_id === 'date_and_time'"
        :type="propertie?.data_type_id === 'date' ? 'date' : 'datetime-local'"
        :unique-id="propertie.unique_id"
        v-model="filterQuerys[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete filterQuerys[propertie.unique_id]" />

      <multiple-choose-input v-else-if="propertie?.data_type_id === 'multiple_choice'"
        :multiple="true"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="filterQuerys[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete filterQuerys[propertie.unique_id]" />

      <multiple-choose-input v-else-if="propertie?.data_type_id === 'single_choice'"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="filterQuerys[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete filterQuerys[propertie.unique_id]" />

      <yes-or-no-input v-else-if="propertie?.data_type_id === 'yes_or_no'"
        :small="true"
        v-model="filterQuerys[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete filterQuerys[propertie.unique_id]" /> -->
  </div>
</template>