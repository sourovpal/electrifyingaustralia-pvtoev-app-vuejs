<script setup>
  import { defineProps, computed } from 'vue';
  import MultipleSelectVue from "../../../components/fields/MultipleSelect.vue";
  import { usePlatformStore } from '@stores';
  // import YesOrNoInput from "../fields/YesOrNoInput.vue";
  const platformStore = usePlatformStore();
  const propertiesValues = computed(() => platformStore.getLeadPropertiesValues);
  const props = defineProps({
    properties: { type: Array, default: [] }
  });

</script>

<template>
  <div class="mb-2 lead-propertie-input"
    v-for="(propertie, index) in properties"
    :key="index">
    <label class="form-label-title"
      :for="propertie?.unique_id">{{
      propertie?.label
      }}</label>

    <div v-if="propertie?.data_type_id === 'free_text' || propertie?.data_type_id === 'read_only'">
      <input class="form-control"
        type="text"
        :name="propertie?.unique_id"
        v-model="propertiesValues[propertie.unique_id]" />
    </div>

    <div v-else-if="propertie?.data_type_id === 'real_number'">
      <input class="form-control"
        type="number"
        :name="propertie?.unique_id"
        v-model="propertiesValues[propertie.unique_id]" />
    </div>

    <div v-else-if="propertie?.data_type_id === 'date'">
      <input class="form-control"
        type="date"
        :name="propertie?.unique_id"
        v-model="propertiesValues[propertie.unique_id]" />
    </div>

    <div v-else-if="propertie?.data_type_id === 'date_and_time'">
      <input class="form-control"
        type="datetime-local"
        :name="propertie?.unique_id"
        v-model="propertiesValues[propertie.unique_id]" />
    </div>

    <div v-else-if="propertie?.data_type_id === 'multiline_free_text'">
      <textarea class="form-control"
        :name="propertie?.unique_id"
        rows="3"
        v-model="propertiesValues[propertie.unique_id]"></textarea>
    </div>

    <MultipleSelectVue v-else-if="propertie?.data_type_id === 'multiple_choice'"
      :name="propertie?.unique_id"
      :multiple="true"
      :options="propertie?.options ?? []"
      v-model="propertiesValues[propertie.unique_id]"
      lable="value"
      :return-properties="['value']" />
    <MultipleSelectVue v-else-if="propertie?.data_type_id === 'single_choice'"
      :name="propertie?.unique_id"
      :multiple="false"
      :options="propertie?.options ?? []"
      v-model="propertiesValues[propertie.unique_id]"
      :return-properties="['value']" />

    <div class="mt-1"
      v-else-if="propertie?.data_type_id === 'yes_or_no'">
      <!-- <yes-or-no-input :small="false"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => propertiesValues[propertie.unique_id] = value" /> -->
    </div>
  </div>
</template>