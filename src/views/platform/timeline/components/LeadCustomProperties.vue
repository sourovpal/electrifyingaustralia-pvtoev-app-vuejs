<script setup>
  import { computed } from 'vue';
  import { usePlatformStore } from '@stores';
  import MultiSelect from 'primevue/multiselect';
  import _ from 'lodash';
  const platformStore = usePlatformStore();
  const propertiesValues = computed(() => platformStore.getLeadPropertiesValues);
  const props = defineProps({
    properties: { type: Array, default: [] },
    labelHighlight: { default: null }
  });

</script>

<template>
  <div class="mb-2 lead-propertie-input"
    v-for="(propertie, index) in properties"
    :key="index">

    <label class="mb-2 fs-14px text-head white-space-nowrap position-relative w-100"
      :title="`${propertie?.label} ${labelHighlight?' - '+labelHighlight:''}`">

      {{ _.truncate(propertie?.label) }}

      <span v-if="labelHighlight"
        class="ms-1 fs-10px badge alert-primary label-highlight">{{ labelHighlight }}</span>

    </label>

    <div class="mb-3"
      v-if="propertie?.data_type_id === 'free_text' || propertie?.data_type_id === 'read_only'">

      <icon-field>

        <input-icon class="pi pi-align-left fs-14px" />

        <input-text class="w-100"
          size="small"
          v-model="propertiesValues[propertie.unique_id]"
          :placeholder="propertie.label"></input-text>

      </icon-field>

    </div>

    <div class="mb-3"
      v-else-if="propertie?.data_type_id === 'real_number'">

      <icon-field>

        <input-icon class="pi pi-sort-numeric-up fs-14px z-index-999" />

        <input-number class="w-100 icon"
          size="small"
          v-model="propertiesValues[propertie.unique_id]"
          :placeholder="propertie.label"></input-number>

      </icon-field>

    </div>

    <div class="mb-3"
      v-else-if="propertie?.data_type_id === 'date'">

      <icon-field>

        <input-icon class="pi pi-calendar fs-14px" />

        <input-date class="w-100 icon"
          size="small" dateFormat="mm/dd/yy"
          v-model="propertiesValues[propertie.unique_id]"
          :placeholder="propertie.label"></input-date>

      </icon-field>

    </div>

    <div class="mb-3"
      v-else-if="propertie?.data_type_id === 'date_and_time'">

      <icon-field>

        <input-icon class="pi pi-calendar-clock fs-14px" />

        <input-date class="w-100 icon"
          size="small"
          showTime
          hourFormat="24" dateFormat="mm/dd/yy"
          v-model="propertiesValues[propertie.unique_id]"
          :placeholder="propertie.label"></input-date>

      </icon-field>

    </div>

    <div class="mb-3"
      v-else-if="propertie?.data_type_id === 'multiline_free_text'">
      <textarea class="form-control"
        :name="propertie?.unique_id"
        rows="3"
        v-model="propertiesValues[propertie.unique_id]"></textarea>
    </div>

    <div class="mb-3"
      v-else-if="propertie?.data_type_id === 'multiple_choice'">

      <multi-select v-model="propertiesValues[propertie.unique_id]"
        :options="propertie?.options ?? []"
        optionLabel="value"
        filter
        :placeholder="propertie?.label"
        size="small"
        class="w-100"
        overlayClass="multi-select-overlay-small">
      </multi-select>

    </div>

    <div class="mb-3"
      v-else-if="propertie?.data_type_id === 'single_choice'">

      <select-option filter
        v-model="propertiesValues[propertie.unique_id]"
        :options="propertie?.options ?? []"
        :filterFields="['value']"
        optionLabel="value"
        :placeholder="propertie?.label"
        class="w-100 select-option-small"
        panel-class="panel-option-small">
      </select-option>

    </div>

    <div class="mt-1"
      v-else-if="propertie?.data_type_id === 'yes_or_no'">
      <!-- <yes-or-no-input :small="false"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => propertiesValues[propertie.unique_id] = value" /> -->
    </div>
  </div>
</template>

<style scoped
  lang="scss">
  .label-highlight {
    position: absolute;
    right: 0px;
  }
</style>