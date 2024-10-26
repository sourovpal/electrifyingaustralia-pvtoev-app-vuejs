<script setup>
  import FreeTextInput from "./fields/FreeTextInput.vue";
  import DateAndTimeInput from "./fields/DateAndTimeInput.vue";
  import MultipleChooseInput from "./fields/MultipleChooseInput.vue";
  import { usePlatformStore } from "@stores";
  import { computed, ref, watchEffect, } from "vue";
  import YesOrNoInput from "./fields/YesOrNoInput.vue";
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

  async function onChangeHandler(value, uniqueId) {

    if (Object.keys(propertiesValues.value).includes(uniqueId)) {

      var data = {
        propertie: {
          [uniqueId]: value,
        },
      };

      const res = await useApiRequest({
        url: `/leads/${editLeadId.value}/propertie`,
        method: 'post',
        payload: data
      }).then(res => {

        const { success, message } = res;

        if (success) {

          platformStore.callFetchTimelineLogs();

        } else {

          $toast.error(message.text);

        }

      }).catch(error => {
        $toast.clear();
        $toast.error(error.message);
      });
    }
  }
</script>

<template>
  <div>
    <div v-if="isFirstLoading"
      v-for="(item, index) in 3"
      :key="Math.random()"
      class="mb-0 lead-propertie-input">
      <label class="fs-12px text-soft"
        for="">Lead Properties</label>
      <Skeletor class="form-control form-control-sm rounded-sm"
        style="border-radius:3px;" />
    </div>

    <div v-else
      class="mb-2 lead-propertie-input"
      v-for="(propertie, index) in leadProperties"
      :key="index">
      <free-text-input v-if="
          propertie?.data_type_id === 'free_text' ||
          propertie?.data_type_id === 'read_only'
        "
        type="text"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <free-text-input v-else-if="propertie?.data_type_id === 'multiline_free_text'"
        type="textarea"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <free-text-input v-else-if="propertie?.data_type_id === 'real_number'"
        type="number"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <date-and-time-input v-else-if="
          propertie?.data_type_id === 'date' ||
          propertie?.data_type_id === 'date_and_time'
        "
        :type="propertie?.data_type_id === 'date' ? 'date' : 'datetime-local'"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <multiple-choose-input v-else-if="propertie?.data_type_id === 'multiple_choice'"
        :multiple="true"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <multiple-choose-input v-else-if="propertie?.data_type_id === 'single_choice'"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <yes-or-no-input v-else-if="propertie?.data_type_id === 'yes_or_no'"
        :label="propertie.label"
        :small="true"
        v-model="propertiesValues[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />
    </div>
  </div>
</template>

<style lang="scss">
</style>