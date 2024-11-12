<script setup>
  import { ref, watch, nextTick } from "vue";
  import { useApiRequest } from "@actions";
  import { formatLeadAddress } from "@helpers";
  import { useDebounceFn, onClickOutside } from "@vueuse/core";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const autocompleteRef = ref(null);
  const searchInput = ref(null);
  const searchQuery = ref(null);
  const isLoading = ref(false);
  const results = ref([]);

  const handleToggle = () => {
    if (results.value.length) autocompleteRef.value.show();
  }

  const searchLeadsOrDeals = useDebounceFn(async ({ query }) => {
    searchQuery.value = query;
    if (!query) {
      isLoading.value = false;
      return results.value = [];
    }

    isLoading.value = true;

    await useApiRequest({
      url: `/platform/leads/search`,
      method: 'post',
      payload: {
        lead: true,
        contact: true,
        limit: 12,
        search: query,
      }
    }).then((leads) => results.value = leads)
      .catch((error) => { });

    isLoading.value = false;

  }, 1000);

  function handleOptionSelect({ value }) {
    nextTick(() => searchInput.value = searchQuery.value);

    if (value.pipeline) return router.push({ name: 'timeline-deal-edit', params: { id: value.lead_id } });

    return router.push({ name: 'timeline-lead-edit', params: { id: value.lead_id } });

  }



</script>

<template>
  <section class="crm-tools-bar px-3 d-flex justify-content-between align-items-center">
    <div class="search-box">

      <icon-field>

        <input-icon class="pi pi-search fs-18px z-index-999" />

        <auto-complete ref="autocompleteRef"
          class="w-100"
          input-class="w-100 search-input-text rounded-1"
          dropdown-class="py-1"
          pt:overlay:style="max-height:30rem;max-width:35rem;"
          pt:listContainer:style="max-height:30rem;"
          :completeOnFocus="false"
          :loading="isLoading"
          placeholder="Search lead's or deal's"
          v-model="searchInput"
          :suggestions="results"
          @click="handleToggle"
          @option-select="handleOptionSelect"
          @complete="searchLeadsOrDeals">

          <template #option="slotProps">

            <div class="d-flex justify-content-start align-items-center w-100">

              <div class="w-75 d-block">

                <div class="fs-12px address">

                  {{ slotProps.option?.lead_title }}

                  <span v-if="slotProps.option?.lead_title && formatLeadAddress(slotProps.option)">
                    &nbsp;•&nbsp;
                  </span>

                  {{ formatLeadAddress(slotProps.option) }}

                </div>

                <div class="text-soft fs-14px">

                  {{ slotProps.option?.primary_contact?.full_name }}

                  <span v-if="slotProps.option?.primary_contact?.email">
                    &nbsp;•&nbsp;
                    {{ slotProps.option?.primary_contact?.email }}
                  </span>

                  <span v-if="slotProps.option?.primary_contact?.phone_number">
                    &nbsp;•&nbsp;
                    {{ slotProps.option?.primary_contact?.phone_number }}
                  </span>

                </div>

              </div>

              <div class="w-25 d-flex">

                <div v-if="slotProps.option?.pipeline"
                  class="badge ms-auto"
                  :class="{
                    'alert-primary':slotProps.option?.pipeline_stage?.status == 'primary',
                    'alert-success':slotProps.option?.pipeline_stage?.status == 'success',
                    'alert-danger':slotProps.option?.pipeline_stage?.status == 'lost',
                  }">
                  {{ slotProps.option?.pipeline?.title }} /
                  {{ slotProps.option?.pipeline_stage?.name }}
                </div>

                <div v-if="!slotProps.option?.pipeline && slotProps.option?.status"
                  class="badge alert-success ms-auto"
                  :class="{
                    'alert-primary':slotProps.option?.status?.is_lost == 0,
                    'alert-danger':slotProps.option?.status?.is_lost == 1,
                  }">
                  {{ slotProps.option?.status?.name }}
                </div>

              </div>

            </div>

          </template>

        </auto-complete>

      </icon-field>

    </div>

  </section>
</template>

<style lang="scss"
  scoped>
  :deep(.search-input-text) {
    padding-left: 2.5rem;
    &:not(:focus){
      border-color:var(--layout-border-color);
    }
  }

  .badge {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .address {
    white-space: normal;
    line-height: 12px;
    font-weight: 600;
    word-break: break-all;
  }

  .crm-tools-bar {
    height: 3.5rem;
    border-bottom: 1px solid var(--layout-border-color);

    .search-box {
      width: 35rem;

      @media only screen and (max-width: 767px) {
        width: 100% !important;
      }
    }
  }
</style>