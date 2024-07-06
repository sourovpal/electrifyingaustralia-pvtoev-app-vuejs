<script setup>
import MultipleSelectVue from "../../../../../components/forms/MultipleSelect.vue";
const props = defineProps(["leadProperties", "customFormData"]);
</script>

<template>
  <div
    class="mb-2 lead-propertie-input"
    v-for="(field, index) in leadProperties"
    :key="index"
  >
    <label class="form-label-title" :for="field?.unique_id">{{
      field?.label
    }}</label>

    <div
      v-if="
        field?.data_type_id === 'free_text' ||
        field?.data_type_id === 'read_only'
      "
    >
      <input
        class="form-control"
        type="text"
        :name="field?.unique_id"
        v-model="customFormData[field.unique_id]"
      />
    </div>

    <div v-else-if="field?.data_type_id === 'real_number'">
      <input
        class="form-control"
        type="number"
        :name="field?.unique_id"
        v-model="customFormData[field.unique_id]"
      />
    </div>

    <div v-else-if="field?.data_type_id === 'date'">
      <input
        class="form-control"
        type="date"
        :name="field?.unique_id"
        v-model="customFormData[field.unique_id]"
      />
    </div>

    <div v-else-if="field?.data_type_id === 'date_and_time'">
      <input
        class="form-control"
        type="datetime-local"
        :name="field?.unique_id"
        v-model="customFormData[field.unique_id]"
      />
    </div>

    <div v-else-if="field?.data_type_id === 'multiline_free_text'">
      <textarea
        class="form-control"
        :name="field?.unique_id"
        rows="1"
        v-model="customFormData[field.unique_id]"
      ></textarea>
    </div>

    <div
      v-else-if="field?.data_type_id === 'yes_or_no'"
      class="tri-state-toggle"
    >
      <button
        @click="manageYesOrNoHandler('yes', field.unique_id)"
        :class="{ active: customFormData[field.unique_id] == 1 }"
        class="tri-state-toggle-button text-head fw-bold fs-12px"
      >
        Yes
      </button>
      <button
        @click="manageYesOrNoHandler('', field.unique_id)"
        :class="{
          active:
            customFormData[field.unique_id] != -1 &&
            customFormData[field.unique_id] != 1,
        }"
        class="tri-state-toggle-button fs-16px text-head fw-bold"
      >
        &times;
      </button>
      <button
        @click="manageYesOrNoHandler('no', field.unique_id)"
        :class="{ active: customFormData[field.unique_id] == -1 }"
        class="tri-state-toggle-button text-head fw-bold fs-12px"
      >
        No
      </button>
    </div>

    <MultipleSelectVue
      v-else-if="field?.data_type_id === 'multiple_choice'"
      :name="field?.unique_id"
      :multiple="true"
      :options="field?.options ?? []"
      v-model="customFormData[field.unique_id]"
      lable="value"
      :return-fields="['value']"
    />
    <MultipleSelectVue
      v-else-if="field?.data_type_id === 'single_choice'"
      :name="field?.unique_id"
      :multiple="false"
      :options="field?.options ?? []"
      v-model="customFormData[field.unique_id]"
      :return-fields="['value']"
    />
    {{ customFormData[field.unique_id] }}
  </div>
</template>