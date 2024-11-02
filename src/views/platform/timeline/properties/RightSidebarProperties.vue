<script setup>
  import Protector from './Protector.vue';
  import MultiSelect from 'primevue/multiselect';
  import { usePlatformStore } from "@stores";
  import { computed, ref, watchEffect, watch } from "vue";
  import { useApiRequest } from "@actions/api";
  import { useRoute } from "vue-router";
  import { Skeletor } from "vue-skeletor";
  import { $toast } from '@config';

  const route = useRoute();
  const platformStore = usePlatformStore();

  const leadProperties = computed(() => {
    return platformStore.getLeadProperties.concat(platformStore.getPipelineProperties);
  });

  const propertiesValues = computed(() => platformStore.getLeadPropertiesValues);
  const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
  const editLeadId = computed(() => platformStore.getEditLeadId);

  async function onChangeHandler(uniqueId) {

    if (!Object.keys(propertiesValues.value).includes(uniqueId)) {
      return;
    }

    var payload = {
      propertie: {
        [uniqueId]: propertiesValues.value[uniqueId],
      },
    };

    const res = await useApiRequest({
      url: `/leads/${editLeadId.value}/propertie`,
      method: 'post',
      payload
    }).then(res => {

      const { success, message } = res;

      if (success) {

        platformStore.callFetchTimelineLogs();

      } else {

        $toast.error(message.text);

      }

    }).catch(error => {
      $toast.error(error.message);
    });
  }
</script>

<template>
  <div class="right-sidebar-properties p-3 pt-0">

    <div v-if="isFirstLoading"
      v-for="(item, index) in 10"
      :key="Math.random()"
      class="mb-0 lead-propertie-input">

      <label class="fs-12px mb-0 d-block text-soft">Lead Properties</label>
      <input-text size="small"
        class="w-100 py-small rounded-1 fw-bold"
        placeholder="—">
      </input-text>

    </div>

    <div v-else
      class="mb-1 lead-propertie-input"
      v-for="(propertie, index) in leadProperties"
      :key="index">

      <label class="fs-12px mb-0 d-block text-soft">{{ propertie.label }}</label>

      <Protector v-if="propertie?.data_type_id === 'free_text' || propertie?.data_type_id === 'read_only'">

        <input-text size="small"
          class="w-100 py-small rounded-1 fw-bold"
          placeholder="—"
          @blur="onChangeHandler(propertie.unique_id)"
          v-model="propertiesValues[propertie.unique_id]">
        </input-text>

      </Protector>


      <Protector v-else-if="propertie?.data_type_id === 'multiline_free_text'">

        <text-area class="w-100 py-small rounded-1"
          :name="propertie?.unique_id"
          rows="1"
          placeholder="—"
          @blur="onChangeHandler(propertie.unique_id)"
          v-model="propertiesValues[propertie.unique_id]"></text-area>

      </Protector>

      <Protector v-else-if="propertie?.data_type_id === 'real_number'">

        <input-number class="w-100"
          input-class="py-small rounded-1"
          @blur="onChangeHandler(propertie.unique_id)"
          v-model="propertiesValues[propertie.unique_id]"
          placeholder="—"></input-number>

      </Protector>


      <Protector v-else-if="propertie?.data_type_id === 'date'">

        <input-date class="w-100"
          input-class="py-small rounded-1"
          @date-select="onChangeHandler(propertie.unique_id)"
          v-model="propertiesValues[propertie.unique_id]"
          placeholder="—"></input-date>

      </Protector>

      <Protector v-else-if="propertie?.data_type_id === 'date_and_time'">

        <input-date class="w-100"
          showTime
          hourFormat="24"
          input-class="py-small rounded-1"
          @date-select="onChangeHandler(propertie.unique_id)"
          v-model="propertiesValues[propertie.unique_id]"
          placeholder="—"></input-date>

      </Protector>

      <Protector v-else-if="propertie?.data_type_id === 'multiple_choice'">

        <multi-select v-model="propertiesValues[propertie.unique_id]"
          :options="propertie?.options ?? []"
          optionLabel="value"
          filter
          placeholder="—"
          class="w-100 rounded-1"
          label-class="rounded-1"
          @change="onChangeHandler(propertie.unique_id)"
          overlayClass="multi-select-overlay-small">
        </multi-select>

      </Protector>

      <Protector v-else-if="propertie?.data_type_id === 'single_choice'">

        <select-option filter
          v-model="propertiesValues[propertie.unique_id]"
          :options="propertie?.options ?? []"
          :filterFields="['value']"
          optionLabel="value"
          placeholder="—"
          class="w-100 rounded-1"
          label-class="py-small rounded-1"
          @change="onChangeHandler(propertie.unique_id)"
          panel-class="panel-option-small">
        </select-option>

      </Protector>

    </div>

  </div>
</template>

<style lang="scss">
  .right-sidebar-properties {
    .py-small {
      padding-top: 2px !important;
      padding-bottom: 2px !important;
      font-size: 12px !important;
      font-weight: bold;
    }

    .p-multiselect-label-container {
      .p-multiselect-label {
        @extend .py-small;
      }
    }

    .p-multiselect-dropdown,
    .p-select-dropdown {
      .p-icon {
        width: 12px;
        height: 12px;
      }
    }
  }
</style>