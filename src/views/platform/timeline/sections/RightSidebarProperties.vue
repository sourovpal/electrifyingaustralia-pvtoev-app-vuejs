<script setup>
  import { LeadPropertieUpdate } from "@actions/LeadAction";
  import FreeTextInput from "../../components/CustomProperties/FreeTextInput.vue";
  import DateAndTimeInput from "../../components/CustomProperties/DateAndTimeInput.vue";
  import MultipleChooseInput from "../../components/CustomProperties/MultipleChooseInput.vue";
  import { useLeadStore } from "@stores/lead";
  import { useAppStore } from "@stores/app";
  import { computed, ref, watchEffect, defineProps } from "vue";
  import YesOrNoInput from "../../components/CustomProperties/YesOrNoInput.vue";
  import { useRoute } from "vue-router";
  import { Skeletor } from "vue-skeletor";

  const props = defineProps({
    isFirstLoading: { type: Boolean, default: false },
  });

  const route = useRoute();
  const leadStore = useLeadStore();
  const customFormData = ref({});

  const leadProperties = computed(() => {
    return []
      .concat(leadStore.getLeadProperties ?? [])
      .concat(leadStore.getPipelineProperties ?? []);
  });

  watchEffect(() => {
    customFormData.value = leadStore.getLeadPropertiesValues ?? {};
  });

  async function onChangeHandler(value, uniqueId) {
    var leadId = route.params?.id;
    if (Object.keys(customFormData.value).includes(uniqueId)) {
      var data = {
        propertie: {
          [uniqueId]: value,
        },
        lead: leadId,
      };
      const res = await LeadPropertieUpdate(data);
      leadStore.callFetchTimelineLogs({}, false, true);
    }
  }
</script>

<template>
  <div>
    <div v-if="isFirstLoading"
      v-for="(item, index) in 5"
      :key="index+1000"
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
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <free-text-input v-else-if="propertie?.data_type_id === 'multiline_free_text'"
        type="textarea"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <free-text-input v-else-if="propertie?.data_type_id === 'real_number'"
        type="number"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <date-and-time-input v-else-if="
          propertie?.data_type_id === 'date' ||
          propertie?.data_type_id === 'date_and_time'
        "
        :type="propertie?.data_type_id === 'date' ? 'date' : 'datetime-local'"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <multiple-choose-input v-else-if="propertie?.data_type_id === 'multiple_choice'"
        :multiple="true"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <multiple-choose-input v-else-if="propertie?.data_type_id === 'single_choice'"
        :label="propertie.label"
        :unique-id="propertie.unique_id"
        :options="propertie.options ?? []"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />

      <yes-or-no-input v-else-if="propertie?.data_type_id === 'yes_or_no'"
        :label="propertie.label"
        :small="true"
        v-model="customFormData[propertie.unique_id]"
        @change="(value) => onChangeHandler(value, propertie.unique_id)" />
    </div>
  </div>
</template>

<style lang="scss">
</style>