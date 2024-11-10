<script setup>
  import { ref, onMounted, computed, watch } from "vue";
  import CustomScrollbar from "custom-vue-scrollbar";
  import LoadingStateLeads from "./LoadingStateLeads.vue";
  import ColumnDeal from "./ColumnDeal.vue";
  import { usePipelineStore } from "@stores";
  import { useApiRequest } from "@actions";
  import { generateSlug } from "@helpers";
  import { useIntersectionObserver, useDebounceFn } from "@vueuse/core";
  import NumberAnimation from "vue-number-animation";

  const props = defineProps({
    stage: { type: Object, default: {} },
  });

  const pipelineStore = usePipelineStore();

  const pipelineStage = computed(() => props.stage);
  const searchQuery = computed(() => pipelineStore.getSearchQuery);
  const pipelineId = computed(() => pipelineStore.getPipelineId);
  const orderBy = computed(() => pipelineStore.getOrderBy);
  const orderColumn = computed(() => pipelineStore.getOrderColumn);
  const filterQuerys = computed(() => pipelineStore.getFilterQuerys);

  const isFirstLoadingLeads = ref(true);
  const isLoadingLeads = ref(false);
  const stageLeads = ref([]);
  const infiniteLoadedLeadRef = ref(null);
  const page = ref(1);
  let observer = null;
  let popoverRef = ref(null);

  const toggle = (event) => {
    popoverRef.value.toggle(event);
  }


  function handleObserver($callback = () => { }, isReset = false) {
    observer = useIntersectionObserver(
      infiniteLoadedLeadRef,
      ([{ isIntersecting }], observerElement) => {
        if (isIntersecting && !isLoadingLeads.value && page.value) {
          $callback({ isReset: false });
        }
      }
    );
    $callback({ isReset });
  }

  async function fetchStageLeads({ isReset }) {
    if (!pipelineStage.value.leads_count) {
      isFirstLoadingLeads.value = false;
      return true;
    }

    isLoadingLeads.value = true;

    let payload = {
      page: page.value,
      order: orderBy.value,
      column: orderColumn.value,
    };

    if (searchQuery.value) {
      payload["search"] = searchQuery.value;
    }

    if (Object.keys(filterQuerys.value).length) {
      payload["filters"] = JSON.stringify(filterQuerys.value);
    }

    await useApiRequest({
      url: `/platform/pipeline/${pipelineId.value}/stage/${pipelineStage.value?.stage_id}-${generateSlug(pipelineStage.value.name)}/deals`,
      payload,
    })
      .then((res) => {

        const { success, leads, pagination } = res;

        if (success) {

          if (isReset) {
            stageLeads.value = leads;
          } else {
            stageLeads.value = stageLeads.value.concat(leads);
          }

          page.value = pagination.next_page;

          if (!pagination.next_page) {
            if (observer) observer.stop();
          }

        }

        isLoadingLeads.value = false;

        isFirstLoadingLeads.value = false;
      })
      .catch((err) => {
        isFirstLoadingLeads.value = false;

        isLoadingLeads.value = false;
      });
  }

  const handlefetchStageLeads = useDebounceFn(() => {
    page.value = 1;
    handleObserver(fetchStageLeads, true);
  }, 2000);

  watch(searchQuery, (search) => {
    page.value = 1;
    handleObserver(fetchStageLeads, true);
  });

  watch(filterQuerys.value, (search) => {
    handlefetchStageLeads();
  });

  watch(
    () => [orderBy, orderColumn],
    (search) => {
      page.value = 1;
      handleObserver(fetchStageLeads, true);
    },
    { deep: true }
  );

  onMounted(() => {
    isFirstLoadingLeads.value = true;
    handleObserver(fetchStageLeads, true);
  });

</script>

<template>

  <div class="piplien-state"
    :style="`--border-top-color:${pipelineStage.color}`">

    <div class="stage-header ps-3 pe-2 pt-1">

      <div class="d-flex justify-content-between align-items-center mb-2">

        <h5 class="mb-0 fs-18px fw-bold d-flex justify-content-start align-items-center w-75"
          :class="{
          'text-primary':pipelineStage?.status == 'primary',
          'text-success':pipelineStage?.status == 'success',
          'text-danger':pipelineStage?.status == 'lost',
        }">

          <div class="text-overflow-ellipsis white-space-nowrap">
            {{ pipelineStage.name }}
          </div>

          <span class="ms-2 white-space-nowrap">
            ( {{ pipelineStage?.leads_count?.toLocaleString() }} )
          </span>

        </h5>

        <div class="ms-auto">

          <button @click="toggle"
            class="btn btn-sm btn-light btn-floating d-flex justify-content-center align-items-center">
            <font-awesome-icon icon="fas fa-ellipsis-vertical"></font-awesome-icon>
          </button>

        </div>

      </div>

      <div class="d-flex justify-content-between align-items-center pe-2 fs-14px">
        <span>Total</span>
        <span>${{ pipelineStage?.total_estimated_value?.toLocaleString() }}</span>
      </div>

    </div>


    <div v-if="isFirstLoadingLeads"
      class="pip-body px-3">

      <loading-state-leads :size="6" />

    </div>

    <CustomScrollbar v-else
      thumbWidth="3.5"
      direction="vertical">

      <div class="pip-body px-3 pb-5">

        <column-deal v-for="lead in stageLeads"
          :key="lead.lead_id"
          :lead="lead"></column-deal>

        <div ref="infiniteLoadedLeadRef">

          <loading-state-leads v-if="isLoadingLeads"
            :size="6"></loading-state-leads>

        </div>

      </div>

    </CustomScrollbar>

    <Popover ref="popoverRef"
      class="py-0">
      <template #container>
        <ul class="list-unstyled popovar-list mb-0 py-1">

          <li class="dropdown-item px-3 py-1">
            <router-link class="dropdown-link text-soft d-block"
              :to="`/settings/crm/pipeline/${pipelineId}`">
              <i class="icon pi pi-pen-to-square"></i>
              Edit
            </router-link>
          </li>
          
        </ul>
      </template>
    </Popover>

  </div>

</template>
<style scoped
  lang="scss">
  .popovar-list {
    min-width: 10rem;

    .icon {
      width: 2rem;
    }
  }

  .piplien-state:deep() {
    --border-top-color: white;
    border-top: 5px solid var(--border-top-color);
    min-width: 18.5rem;
    max-width: 18.5rem;
    background-color: rgb(255, 255, 255);
    border-radius: 3px;
    margin-right: 1rem;
    overflow: hidden;

    .scrollbar__scroller {
      height: 100% !important;
    }

    .scroll .scrollbar__scroller {
      scroll-behavior: auto !important;
      width: 100%;
    }

    .scrollbar__wrapper {
      height: calc(79vh - 5px) !important;
    }
  }
</style>