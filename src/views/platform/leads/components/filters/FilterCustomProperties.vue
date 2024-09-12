<script setup>
import { defineProps, ref } from "vue";
import { getCustomPropertieIcon } from "@helpers/formats";
import SlideUpDown from "vue-slide-up-down";
import FreeTextInput from "./FreeTextInput.vue";
import DateAndTimeInput from "./DateAndTimeInput.vue";
import MultipleChooseInput from "./MultipleChooseInput.vue";
import YesOrNoInput from "./YesOrNoInput.vue";
import MakeDropdown from "./MakeDropdown.vue";
const props = defineProps({
  leadProperties: {
    type: Array,
    default: [],
  },
  customFormData: {
    type: Object,
    default: {},
  },
});
const dropdownProperties = ref({});

function toggleDropdownHandler(uniqueId) {
  dropdownProperties.value[uniqueId] = !dropdownProperties.value[uniqueId];
  delete props.customFormData[uniqueId];
}
</script>

<template>
  <div
    class="filter-option"
    v-for="(propertie, index) in leadProperties"
    :key="index"
  >
    <make-dropdown
      :title="propertie?.label"
      :icon="getCustomPropertieIcon(propertie?.data_type_id)"
      @toggle="toggleDropdownHandler(propertie.unique_id)"
    >
      <free-text-input
        v-if="
          propertie?.data_type_id === 'free_text' ||
          propertie?.data_type_id === 'read_only'
        "
        type="text"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete customFormData[propertie.unique_id]"
      />

      <free-text-input
        v-else-if="propertie?.data_type_id === 'multiline_free_text'"
        type="textarea"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete customFormData[propertie.unique_id]"
      />

      <free-text-input
        v-else-if="propertie?.data_type_id === 'real_number'"
        type="number"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?'':delete customFormData[propertie.unique_id]"
        />
        
      <date-and-time-input
        v-else-if="
          propertie?.data_type_id === 'date' ||
          propertie?.data_type_id === 'date_and_time'
        "
        :type="propertie?.data_type_id === 'date' ? 'date' : 'datetime-local'"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete customFormData[propertie.unique_id]"
      />

      <multiple-choose-input
        v-else-if="propertie?.data_type_id === 'multiple_choice'"
        :multiple="true"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete customFormData[propertie.unique_id]"
      />

      <multiple-choose-input
        v-else-if="propertie?.data_type_id === 'single_choice'"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete customFormData[propertie.unique_id]"
      />

      <yes-or-no-input
        v-else-if="propertie?.data_type_id === 'yes_or_no'"
        :small="true"
        v-model="customFormData[propertie.unique_id]"
        @change="(val)=>val?.length?'':delete customFormData[propertie.unique_id]"
      />
    </make-dropdown>
  </div>
</template>