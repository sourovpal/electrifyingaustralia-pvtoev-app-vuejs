<script setup>
import MultipleSelectVue from "../fields/MultipleSelect.vue";
import YesOrNoInput from "../../CustomProperties/YesOrNoInput.vue";
const props = defineProps(["leadProperties", "customFormData"]);
</script>

<template>
  <div
    class="mb-2 lead-propertie-input"
    v-for="(propertie, index) in leadProperties"
    :key="index"
  >
    <label class="form-label-title" :for="propertie?.unique_id">{{
      propertie?.label
    }}</label>

    <div
      v-if="
        propertie?.data_type_id === 'free_text' ||
        propertie?.data_type_id === 'read_only'
      "
    >
      <input
        class="form-control"
        type="text"
        :name="propertie?.unique_id"
        v-model="customFormData[propertie.unique_id]"
      />
    </div>

    <div v-else-if="propertie?.data_type_id === 'real_number'">
      <input
        class="form-control"
        type="number"
        :name="propertie?.unique_id"
        v-model="customFormData[propertie.unique_id]"
      />
    </div>

    <div v-else-if="propertie?.data_type_id === 'date'">
      <input
        class="form-control"
        type="date"
        :name="propertie?.unique_id"
        v-model="customFormData[propertie.unique_id]"
      />
    </div>

    <div v-else-if="propertie?.data_type_id === 'date_and_time'">
      <input
        class="form-control"
        type="datetime-local"
        :name="propertie?.unique_id"
        v-model="customFormData[propertie.unique_id]"
      />
    </div>

    <div v-else-if="propertie?.data_type_id === 'multiline_free_text'">
      <textarea
        class="form-control"
        :name="propertie?.unique_id"
        rows="3"
        v-model="customFormData[propertie.unique_id]"
      ></textarea>
    </div>

    <MultipleSelectVue
      v-else-if="propertie?.data_type_id === 'multiple_choice'"
      :name="propertie?.unique_id"
      :multiple="true"
      :options="propertie?.options ?? []"
      v-model="customFormData[propertie.unique_id]"
      lable="value"
      :return-properties="['value']"
    />
    <MultipleSelectVue
      v-else-if="propertie?.data_type_id === 'single_choice'"
      :name="propertie?.unique_id"
      :multiple="false"
      :options="propertie?.options ?? []"
      v-model="customFormData[propertie.unique_id]"
      :return-properties="['value']"
    />

    <div class="mt-1" v-else-if="propertie?.data_type_id === 'yes_or_no'">
      <yes-or-no-input
        :small="false"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => customFormData[propertie.unique_id] = value"
      />
    </div>
  </div>
</template>