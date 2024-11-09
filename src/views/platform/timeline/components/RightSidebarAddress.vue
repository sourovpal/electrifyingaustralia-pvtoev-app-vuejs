<script setup>
  import { computed, watchEffect, ref, nextTick, watch } from "vue";
  import { Skeletor } from "vue-skeletor";
  import StarRating from "vue-star-rating";
  import { useApiRequest } from "@actions";
  import { formatLeadAddress, formatTimeAgo } from "@helpers";
  import { useClipboard } from "@vueuse/core";
  import { usePlatformStore } from "@stores";
  import { $toast } from "@config";
  import { onClickOutside, useDebounceFn } from "@vueuse/core";

  const platformStore = usePlatformStore();
  const isFirstLoading = computed(() => platformStore.getIsFirstLoading);
  const editLead = computed(() => platformStore.getEditLead);
  const editLeadId = computed(() => platformStore.getEditLeadId);
  const isPipelineLead = computed(() => platformStore.getIsPipelineLead);

  const address = ref(null);
  const leadStarRating = ref(0);
  const isEditEstimatedValue = ref(false);
  const editEstimatedValue = ref(0.0);

  watch(editLead, () => {

    address.value = formatLeadAddress(editLead.value);

    leadStarRating.value = editLead.value?.confidence ?? 0;

  }, { deep: true, immediate: true });

  function confidenceUpdateHandler() {

    useApiRequest({
      url: `/platform/deals/${editLeadId.value}/confidence`,
      method: "put",
      payload: {
        confidence: leadStarRating.value,
      },
    })
      .then((res) => {

        const { success, message } = res;

        if (!success) {

          $toast.error(message.text);

          leadStarRating.value = editLead.value.confidence;

          return;
        }

        platformStore.callFetchTimelineLogs();

      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message);
      });
  }

  async function handleEditEstimatedValue() {
    isEditEstimatedValue.value = true;
    editEstimatedValue.value = editLead.value.estimated_value;
  }

  const handleUpdateEstimatedValue = useDebounceFn(async () => {
    isEditEstimatedValue.value = false;

    if (editEstimatedValue.value == editLead.value.estimated_value) {
      return;

    } else if (!editEstimatedValue.value) {

      editEstimatedValue.value = 0.0;
    }

    useApiRequest({
      url: `/platform/deals/${editLeadId.value}/estimated-value`,
      method: "put",
      payload: {
        estimated_value: editEstimatedValue.value,
      },
    })
      .then((res) => {

        const { success, message, estimated_value } = res;
        if (success) {

          editLead.value.estimated_value = estimated_value;

          platformStore.callFetchTimelineLogs();

          return;
        }

        $toast.error(message.text);

      })
      .catch((error) => {
        $toast.clear();
        $toast.error(error.message);
      });
  }, 200);

</script>

<template>
  <div class="pb-0">

    <div class="mb-1">

      <div class="fs-12px text-soft mb-0">Address</div>

      <div class="d-flex">

        <div v-if="!isFirstLoading"
          class="fs-14px fw-bold text-head mb-0">
          {{ address ?? " — " }}
        </div>


        <Skeletor style="width: 50%; height: 0.6rem"
          v-else></Skeletor>

        <a target="_blank"
          v-if="address"
          :href="`https://www.google.com/maps/search/${address}`"
          class="btn btn-sm btn-light btn-md btn-lg btn-floating bg-transparent ms-auto">
          <font-awesome-icon icon="fa-arrow-up-right-from-square"
            class="text-soft fs-14px" />
        </a>

      </div>

    </div>

    <div class="mb-1">

      <div class="fs-12px text-soft mb-0">Source</div>

      <div class="d-flex">

        <div v-if="!isFirstLoading"
          class="fs-14px fw-bold text-head mb-0">
          {{ editLead?.source?.title ?? " — " }}
        </div>

        <Skeletor style="width: 50%; height: 0.6rem"
          v-else></Skeletor>

      </div>

    </div>

    <div class="mb-1">

      <div class="fs-12px text-soft mb-0">Estimated value</div>

      <div class="d-flex">

        <div v-if="!isFirstLoading"
          class="fs-14px fw-bold text-head mb-0">

          <span class="cursor-pointer"
            @click="handleEditEstimatedValue()"
            v-if="!isEditEstimatedValue">${{ editLead?.estimated_value }}</span>
          <div v-else
            class="d-flex justify-content-start align-items-center">

            <input-number class="w-100"
              input-class="input-number"
              inputId="currency-us"
              mode="currency"
              currency="USD"
              locale="en-US"
              fluid
              size="small"
              @focus="delete errors?.estimated_value"
              @blur="handleUpdateEstimatedValue"
              @keydown.enter="handleUpdateEstimatedValue"
              v-model="editEstimatedValue"
              placeholder="Estimated value"></input-number>

            <span @click="isEditEstimatedValue = false"
              class="ms-2 cursor-pointer">
              <i class="pi pi-times fs-12px text-danger"></i>
            </span>

          </div>

        </div>

        <Skeletor style="width: 50%; height: 0.6rem"
          v-else></Skeletor>

      </div>

    </div>

    <div class="mb-2">
      <div class="fs-12px text-soft mb-0">Confidence</div>
      <star-rating style="line-height: 20px"
        :star-size="16"
        :rounded-corners="true"
        :border-width="2"
        inactive-color="#F8F9F9"
        active-color="#FF9529"
        border-color="#AEB6BF"
        active-border-color="#FF9529"
        :increment="0.5"
        v-model:rating="leadStarRating"
        @click="confidenceUpdateHandler"
        :show-rating="false" />
    </div>

    <div class="mb-2">
      <div class="fs-12px text-soft mb-0">Created At</div>
      <div>{{ formatTimeAgo(editLead.created_at, 15)?.replace('a few seconds ago', 'just now')?? " — " }}</div>
    </div>

    <div class="mb-2">
      <div class="fs-12px text-soft mb-0">Last Update</div>
      <div>{{ formatTimeAgo(editLead.updated_at)?.replace('a few seconds ago', 'just now')?? " — " }}</div>
    </div>

  </div>

</template>